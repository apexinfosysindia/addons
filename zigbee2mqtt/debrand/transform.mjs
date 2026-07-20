#!/usr/bin/env node
// ApexOS display-string transform for the Zigbee2MQTT app image.
//
// Scope (display strings ONLY — see the add-on repo docs for the surface
// classification):
//   1. /app/dist                     — backend log/error strings + the settings
//                                      schema (titles/descriptions drive the
//                                      frontend settings UI) + schema defaults/
//                                      examples for the discovery topics.
//   2. node_modules frontends' dist  — served web UI bundles (both selectable
//                                      packages), incl. the onboarding page.
//
// Deliberately NOT touched (wire protocol / contracts):
//   - the `homeassistant` settings key (config yaml, ZIGBEE2MQTT_CONFIG_* env,
//     bridge/request/options payloads, frontend tab route) — lowercase
//     `homeassistant` is never rewritten;
//   - MQTT discovery topics/payload keys (values are pinned by the entrypoint);
//   - i18n resource keys (underscore/dash forms are never matched);
//   - hyphenated doc URLs (not matched by the display forms below);
//   - factual third-party data (OUI vendor table, device vendor names).
//
// Usage: node transform.mjs /app
// Exits non-zero if an expected target saw zero replacements or if any
// display form survives the rewrite (scan includes recompressed variants).

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const NEW_BRAND = "ApexOS";
// Case-sensitive display forms. Lowercase `homeassistant`/`home assistant`
// intentionally absent (settings key / not present as a display form).
const DISPLAY_FORMS = ["Home Assistant", "Homeassistant", "HomeAssistant"];
const TEXT_EXT = new Set([".js", ".mjs", ".cjs", ".json", ".html", ".css", ".txt", ".map", ".ts"]);

const appRoot = process.argv[2];
if (!appRoot || !fs.existsSync(appRoot)) {
    console.error(`usage: transform.mjs <appRoot>; got '${appRoot}'`);
    process.exit(2);
}

let totalByTarget = {};

function replaceAll(text) {
    let n = 0;
    for (const form of DISPLAY_FORMS) {
        const parts = text.split(form);
        n += parts.length - 1;
        text = parts.join(NEW_BRAND);
    }
    return [text, n];
}

function* walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) yield* walk(p);
        else if (e.isFile() || e.isSymbolicLink()) yield p;
    }
}

// --- semantic rewrite of the settings schema ------------------------------
// Only UI-facing string fields (title/description) anywhere in the document,
// plus default/examples of the two discovery-topic fields so the settings UI
// placeholders match the prefix ApexOS core actually uses. Runtime defaults
// live in code (lib/util/settings.ts) and are pinned by the entrypoint env,
// so this is display-level.
function transformSchema(file) {
    const doc = JSON.parse(fs.readFileSync(file, "utf8"));
    let n = 0;

    const visit = (node) => {
        if (Array.isArray(node)) return node.forEach(visit);
        if (node === null || typeof node !== "object") return;
        for (const key of ["title", "description"]) {
            if (typeof node[key] === "string") {
                const [out, c] = replaceAll(node[key]);
                node[key] = out;
                n += c;
            }
        }
        for (const v of Object.values(node)) visit(v);
    };
    visit(doc);

    const ha = doc.properties?.homeassistant?.properties;
    const topicMap = { homeassistant: "apexos", "homeassistant/status": "apexos/status" };
    for (const field of ["discovery_topic", "status_topic"]) {
        const spec = ha?.[field];
        if (!spec) continue;
        if (topicMap[spec.default]) { spec.default = topicMap[spec.default]; n++; }
        if (Array.isArray(spec.examples)) {
            spec.examples = spec.examples.map((v) => topicMap[v] ?? v);
            n++;
        }
    }

    fs.writeFileSync(file, `${JSON.stringify(doc, null, 4)}\n`);
    return n;
}

// --- generic text transform with compressed-sibling regeneration ----------
function transformTree(root, target) {
    let n = 0;
    const plainSeen = new Set();

    for (const file of walk(root)) {
        const ext = path.extname(file);
        if (path.basename(file) === "settings.schema.json") {
            n += transformSchema(file);
            plainSeen.add(file);
            continue;
        }
        if (!TEXT_EXT.has(ext)) continue;
        const text = fs.readFileSync(file, "utf8");
        const [out, c] = replaceAll(text);
        if (c > 0) fs.writeFileSync(file, out);
        n += c;
        plainSeen.add(file);
    }

    // Regenerate (or, if orphaned, rewrite in place) compressed variants.
    for (const file of walk(root)) {
        const compExt = path.extname(file);
        if (compExt !== ".br" && compExt !== ".gz") continue;
        const plain = file.slice(0, -compExt.length);
        if (!TEXT_EXT.has(path.extname(plain))) continue;
        let content;
        if (plainSeen.has(plain)) {
            content = fs.readFileSync(plain);
        } else {
            // orphan compressed file: decompress, transform, recompress
            const raw = fs.readFileSync(file);
            const dec = compExt === ".br" ? zlib.brotliDecompressSync(raw) : zlib.gunzipSync(raw);
            const [out, c] = replaceAll(dec.toString("utf8"));
            n += c;
            content = Buffer.from(out, "utf8");
        }
        const rec =
            compExt === ".br"
                ? zlib.brotliCompressSync(content, {
                      params: {
                          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: content.length,
                      },
                  })
                : zlib.gzipSync(content, { level: 9 });
        fs.writeFileSync(file, rec);
    }

    totalByTarget[target] = (totalByTarget[target] ?? 0) + n;
}

// --- residual scan ---------------------------------------------------------
function scanTree(root) {
    const hits = [];
    for (const file of walk(root)) {
        const ext = path.extname(file);
        let text;
        if (ext === ".br" || ext === ".gz") {
            const plainExt = path.extname(file.slice(0, -ext.length));
            if (!TEXT_EXT.has(plainExt)) continue;
            const raw = fs.readFileSync(file);
            text = (ext === ".br" ? zlib.brotliDecompressSync(raw) : zlib.gunzipSync(raw)).toString("utf8");
        } else if (TEXT_EXT.has(ext)) {
            text = fs.readFileSync(file, "utf8");
        } else {
            continue;
        }
        for (const form of DISPLAY_FORMS) {
            if (text.includes(form)) hits.push(`${file}: ${form}`);
        }
    }
    return hits;
}

// --- run --------------------------------------------------------------------
const targets = [["backend dist", path.join(appRoot, "dist")]];
for (const pkg of ["zigbee2mqtt-windfront", "zigbee2mqtt-frontend"]) {
    const link = path.join(appRoot, "node_modules", pkg);
    if (fs.existsSync(link)) {
        targets.push([pkg, path.join(fs.realpathSync(link), "dist")]);
    } else {
        console.warn(`WARN: frontend package '${pkg}' not installed; skipping`);
    }
}

let failed = false;
for (const [name, dir] of targets) {
    if (!fs.existsSync(dir)) {
        console.error(`FAIL: expected target dir missing: ${dir}`);
        failed = true;
        continue;
    }
    transformTree(dir, name);
    const n = totalByTarget[name] ?? 0;
    console.log(`${name}: ${n} replacements`);
    if (n === 0) {
        console.error(`FAIL: expected replacements in '${name}', got 0 (upstream layout changed?)`);
        failed = true;
    }
    const residues = scanTree(dir);
    if (residues.length > 0) {
        console.error(`FAIL: residual display forms in '${name}':\n  ${residues.join("\n  ")}`);
        failed = true;
    }
}

if (failed) process.exit(1);
console.log("transform OK");
