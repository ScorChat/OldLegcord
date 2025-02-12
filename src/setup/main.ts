import fs from "node:fs";
import { platform } from "node:os";
import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";
import type { Settings } from "../@types/settings.js";
import { getConfig, getConfigLocation, setConfigBulk } from "../common/config.js";
import { getLang } from "../common/lang.js";

let setupWindow: BrowserWindow;
export async function createSetupWindow(): Promise<void> {
    if (platform() !== "darwin") import("./tray.js");
    return new Promise(() => {
        setupWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: "Legcord Setup",
            darkTheme: true,
            icon: getConfig("customIcon") ?? path.join(import.meta.dirname, "../", "/assets/desktop.png"),
            trafficLightPosition: {
                x: 13,
                y: 10,
            },
            titleBarStyle: "hidden",
            titleBarOverlay: {
                color: "#2c2f33",
                symbolColor: "#99aab5",
                height: 30,
            },
            resizable: false,
            vibrancy: "fullscreen-ui",
            maximizable: false,
            autoHideMenuBar: true,
            webPreferences: {
                sandbox: true,
                spellcheck: false,
                preload: path.join(import.meta.dirname, "setup", "preload.mjs"),
            },
        });
        ipcMain.on("setup-minimize", () => {
            setupWindow.minimize();
        });
        ipcMain.on("setup-getOS", (event) => {
            event.returnValue = process.platform;
        });
        ipcMain.on("setup-saveSettings", (_event, args: Settings) => {
            console.log(args);
            setConfigBulk(args);
        });
        ipcMain.on("setup-quit", () => {
            fs.unlink(getConfigLocation(), (err) => {
                if (err) throw err;

                console.log('Closed during setup. "settings.json" was deleted');
                app.quit();
            });
        });
        ipcMain.handle("setup-getLang", (_event, toGet: string) => {
            return getLang(toGet);
        });
        ipcMain.on("setup-restart", () => {
            app.relaunch();
            app.exit();
        });
        void setupWindow.loadFile(path.join(import.meta.dirname, "/html/setup.html"));
    });
}
