import { createSignal } from "solid-js";
import classes from "./HeroUpdater.module.css";
const LOGO_URL = "https://github.com/Legcord/Branding/raw/main/assets/legcord-banner.png"; // Replace with your logo

function checkForUpdates() {
    // Simulate checking for updates
    return new Promise<boolean>((resolve) => setTimeout(() => resolve(Math.random() > 0.5), 1200));
}

const DOWNLOAD_URL = "https://example.com/download"; // Replace with your download page

const HeroUpdater = () => {
    const [checking, setChecking] = createSignal(false);
    const [updateAvailable, setUpdateAvailable] = createSignal<boolean | null>(null);

    const handleCheck = async () => {
        setChecking(true);
        setUpdateAvailable(null);
        const available = await checkForUpdates();
        setUpdateAvailable(available);
        setChecking(false);
    };

    const handleDownload = () => {
        window.open(DOWNLOAD_URL, "_blank");
    };

    return (
        <div style={classes.hero}>
            <img src={LOGO_URL} alt="Logo" style={{ width: "96px", "margin-bottom": "1rem" }} />
            <h2>Update Checker</h2>
            <p>Check if a new version is available and download updates easily.</p>
            <button type="button" onClick={handleCheck} disabled={checking()}>
                {checking() ? "Checking..." : "Check for Updates"}
            </button>
            {updateAvailable() === true && (
                <div style={{ margin: "1rem 0", color: "green" }}>
                    <p>Update available!</p>
                    <button type="button" onClick={handleDownload}>
                        Open Download Page
                    </button>
                </div>
            )}
            {updateAvailable() === false && (
                <div style={{ margin: "1rem 0", color: "gray" }}>
                    <p>Your app is up to date.</p>
                </div>
            )}
        </div>
    );
};

export default HeroUpdater;
