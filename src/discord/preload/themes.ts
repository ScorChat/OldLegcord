import { addTheme } from "../../common/dom.js";
const { ipcRenderer } = require("electron");

ipcRenderer.on("addTheme", (_event, name: string, css: string) => {
    if (document.getElementById(name)) return;
    addTheme(name, css);
});
ipcRenderer.on("removeTheme", (_event, name: string) => {
    document.getElementById(name)!.remove();
});