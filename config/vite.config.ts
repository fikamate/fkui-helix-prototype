import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    // Use relative paths for better portability
    base: "./",

    // Set root to parent directory since we're in config/
    root: path.resolve(__dirname, ".."),

    plugins: [vue()],

    build: {
        minify: false,
        outDir: "dist",
    },

    // Resolve paths properly from new structure
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"),
            "@config": path.resolve(__dirname, "."),
            "@scripts": path.resolve(__dirname, "../scripts"),
            "@tools": path.resolve(__dirname, "../tools"),
        },
    },

    server: {
        port: 5173,
        open: true,
    },
});
