import { addScript, addStyle, injectJS } from "../../common/dom.js";
import { sleep } from "../../common/sleep.js";
const { ipcRenderer } = require("electron");
async function load() {
    await sleep(5000).then(() => {
        // dirty hack to make clicking notifications focus Legcord
        if (
            document.getElementById("window-title") == null &&
            ipcRenderer.sendSync("getConfig", "windowStyle") === "default"
        ) {
            console.warn("Custom titlebar is missing. Switching to native");
            ipcRenderer.send("setConfig", "windowStyle", "native");
            void sleep(2000).then(() => {
                ipcRenderer.send("restart");
            });
        }
        addScript(`
        (() => {
        const originalSetter = Object.getOwnPropertyDescriptor(Notification.prototype, "onclick").set;
        Object.defineProperty(Notification.prototype, "onclick", {
            set(onClick) {
            originalSetter.call(this, function() {
                onClick.apply(this, arguments);
                legcord.window.show();
            })
            },
            configurable: true
        });
        })();
        `);

        // remove the annoying "download the app" button
        addScript(
            "document.querySelector('.guilds_a4d4d9 .scroller_fea3ef').lastChild.previousSibling.style.display = 'none';",
        );
        addScript(`
        shelter.plugins.removePlugin("armcord-settings")
        shelter.plugins.removePlugin("armcord-screenshare")
    `);
        if (ipcRenderer.sendSync("getConfig", "disableAutogain")) {
            injectJS("legcord://assets/js/disableAutogain.js");
        }
        injectJS("legcord://assets/js/rpc.js");
        addStyle("legcord://assets/css/discord.css");
    });
}
load();
