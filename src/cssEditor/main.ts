import fs from "node:fs";
import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";

let cssWindow: BrowserWindow;
const quickCssPath = path.join(app.getPath("userData"), "/quickCss.css");

export function openCssEditor() {
    if (cssWindow) return cssWindow.focus();
    cssWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(import.meta.dirname, "cssEditor", "preload.mjs"),
        },
    });
    cssWindow.loadURL(`file://${import.meta.dirname}/html/editor.html`);

    ipcMain.on("editor-setCSS", (_event, css: string) => {
        fs.writeFileSync(quickCssPath, css);
    });

    ipcMain.on("editor-getCSS", (event) => {
        event.returnValue = fs.readFileSync(quickCssPath, "utf-8");
    });
    cssWindow.on("closed", () => {
        cssWindow.close();
    });
}
