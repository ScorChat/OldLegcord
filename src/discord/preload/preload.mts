import type { LegcordWindow } from "../../@types/legcordWindow.js";
import "./bridge.js";
import "./mods/shelter.mjs";
import "./mods/vencord.mjs";
import "./mods/equicord.mjs";
import "./mods/custom.mjs";
import "./patches.mjs";
import "./titlebar.mjs";
console.log("Legcord");

declare global {
    interface Window {
        legcord: LegcordWindow;
    }
}
