const { ipcRenderer } = require("electron");
import { addStyle } from "../../common/dom.js";
import { sleep } from "../../common/sleep.js";

document.addEventListener("DOMContentLoaded", () => {
    document.body.setAttribute("legcord-platform", ipcRenderer.sendSync("getOS"));
    sleep(500);
    switch (ipcRenderer.sendSync("getOS")) {
        case "darwin":
            document.body.setAttribute("class", "platform-osx");
            break;
        case "win32":
            document.body.setAttribute("class", "platform-win");
            addStyle("legcord://assets/css/winTitlebar.css");
            break;
        case "linux":
            document.body.setAttribute("class", "platform-linux");
            addStyle("legcord://assets/css/winTitlebar.css");
            break;
        default:
            break;
    }
});
