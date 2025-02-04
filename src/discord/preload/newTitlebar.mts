import { addStyle } from "../../common/dom.js";
import { sleep } from "../../common/sleep.js";

// titlebar for discord visual refresh
const titlebarHTML = `
          <div id="window-controls-container">
              <div id="spacer"></div>
              <div id="minimize"><div id="minimize-icon"></div></div>
              <div id="maximize"><div id="maximize-icon"></div></div>
              <div id="quit"><div id="quit-icon"></div></div>
          </div>`;
document.addEventListener("DOMContentLoaded", () => {
    sleep(500);
    const targetElement = document.querySelector('a[href="https://support.discord.com"]');
    //if (!targetElement?.classList.toString().includes("anchor")) return;
    addStyle("legcord://assets/css/newTitlebar.css");

    document.body.setAttribute("legcord-platform", "win32");
    if (targetElement) {
        targetElement.append(titlebarHTML);
        document.body.setAttribute("customTitlebar", "");
    } else {
        alert(1);
    }
});
