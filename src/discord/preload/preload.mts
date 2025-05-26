import type { LegcordWindow } from "../../@types/legcordWindow.js";
import "./bridge.js";
import "./mods/shelter.mjs";
import "./mods/vencord.mjs";
import "./mods/equicord.mjs";
import "./mods/custom.mjs";
import "./patches.mjs";
import "./newTitlebar.mjs";
import "./titlebar.mjs";
import "./themes.js";

console.log("Legcord");
window.localStorage.setItem("hideNag", "true");
declare global {
    interface Window {
        legcord: LegcordWindow;
        LegcordRPC: {
            listen: (
                callback: (msg: {
                    activity: {
                        assets: { large_image: string | null; small_image: string | null };
                        application_id: number;
                        name: string;
                    };
                }) => void,
            ) => void;
        };
    }
}
