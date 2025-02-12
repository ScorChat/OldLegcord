const { contextBridge, ipcRenderer } = require("electron");
import type { Settings } from "../@types/settings.js";

contextBridge.exposeInMainWorld("setup", {
    restart: () => ipcRenderer.send("setup-restart"),
    os: ipcRenderer.sendSync("setup-getOS") as string,
    saveSettings: (...args: [Settings]) => ipcRenderer.send("setup-saveSettings", ...args),
    getLang: (toGet: string) =>
        ipcRenderer.invoke("setup-getLang", toGet).then((result: string) => {
            return result;
        }),
});

declare global {
    interface Window {
        setup: {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            saveSettings: (settings: any) => void;
            restart: () => void;
            getOS: string;
        };
    }
}
