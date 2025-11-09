import type { Configuration } from "electron-builder";

export const config: Configuration = {
    appId: "app.scorchat.oldlegcord",
    productName: "OldLegcord",
    artifactName: "OldLegcord-${version}-${os}-${arch}.${ext}",
    beforePack: "./scripts/build/sandboxFix.cjs",

    mac: {
        category: "public.app-category.social-networking",
        darkModeSupport: true,
        notarize: true,
        extendInfo: {
            NSMicrophoneUsageDescription: "OldLegcord requires access to the microphone to function properly.",
            NSCameraUsageDescription: "OldLegcord requires access to the camera to function properly.",
            "com.apple.security.device.audio-input": true,
            "com.apple.security.device.camera": true,
        },
        x64ArchFiles: "**/node_modules/koffi/**",
    },

    linux: {
        icon: "build/icon.icns",
        target: ["AppImage", "deb", "rpm", "tar.gz"],
        maintainer: "linux@legcord.app",
        category: "Network",
    },

    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
    },

    appx: {
        applicationId: "scorchat.OldLegcord",
        identityName: "58710scorchat.OldLegcord",
        publisher: "CN=EAB3A6D3-7145-4623-8176-D579F573F339",
        publisherDisplayName: "scorchat",
        backgroundColor: "white",
        showNameOnTiles: true,
    },

    snap: {
        environment: { ARRPC_NO_PROCESS_SCANNING: "true" },
        allowNativeWayland: true,
        executableArgs: ["--no-process-scanning"],
        base: "core24",
        publish: {
            provider: "snapStore",
        },
    },

    files: [
        "!*",
        "assets",
        "node-modules",
        "ts-out",
        "dist/venmic-arm64.node",
        "dist/venmic-x64.node",
        "package.json",
        "license.txt",
    ],

    electronDownload: {
        cache: ".cache",
    },
};

export default config;
