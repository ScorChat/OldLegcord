// dirty hack to replace Vencord's quick css editor with Legcord's
// fixes the white window bug

if (window.VencordNative) {
    VencordNative.quickCss.openEditor = function openEditor() {
        window.legcord.themes.openQuickCss()
    }
}