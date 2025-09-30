#!/usr/bin/env node

/**
 * Hjälpscript för att starta Vue-appen med korrekt Node-version
 */

import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🚀 Startar FKUI Vue-applikation...");
console.log(`📍 Node version: ${process.version}`);
console.log(`📁 Working directory: ${process.cwd()}`);

// Kontrollera Node-version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

if (majorVersion < 20) {
    console.error("❌ Node.js version måste vara 20+ för Vite.");
    console.log("💡 Kör: nvm use 22");
    process.exit(1);
}

// Starta Vite
const viteProcess = exec("npx vite --host", (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Fel vid start: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`⚠️ Stderr: ${stderr}`);
    }
    console.log(stdout);
});

viteProcess.stdout.on("data", (data) => {
    console.log(data.toString());
});

viteProcess.stderr.on("data", (data) => {
    console.error(data.toString());
});

viteProcess.on("close", (code) => {
    console.log(`🛑 Process slutade med kod: ${code}`);
});
