/// <reference path="../../../node_modules/@uwu/shelter-defs/dist/shelter-defs/rootdefs.d.ts" />

const {
    util: { log },
    flux: { dispatcher },
} = shelter;
const titlebarOverlayHTML = `<nav class="titlebar">
          <div class="window-title" id="window-title"></div>
        </nav>`;

let isTitlebarOn = false;

function layerPush(payload: {type: string, component: string}) {
    console.log(payload.component)
    if (payload.component === "USER_SETTINGS") {
        const elem = document.createElement("div");
        elem.innerHTML = titlebarOverlayHTML;
        elem.id = "legcordTitlebar"
        isTitlebarOn = true;
        document.body.prepend(elem);
    }
}

function layerPop() {
    console.log("pop!")
    document.getElementById("legcordTitlebar")?.remove()
    isTitlebarOn = false;
}

export function onLoad() {
    if (window.legcord.platform === "win32") {
        log("Legcord Titlebar Controller");
        dispatcher.subscribe("LAYER_PUSH", layerPush);
        dispatcher.subscribe("LAYER_POP", layerPop);
    }
}

export function onUnload() {
    dispatcher.unsubscribe("LAYER_PUSH", layerPush);
    dispatcher.unsubscribe("LAYER_POP", layerPop);
}
