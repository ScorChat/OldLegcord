import { Show, createSignal } from "solid-js";
import type { KeybindActions } from "../../../@types/keybind.js";
import { Dropdown } from "./Dropdown.jsx";
import classes from "./KeybindMaker.module.css";
const {
    ui: {
        ModalRoot,
        ModalBody,
        ModalConfirmFooter,
        ModalSizes,
        ModalHeader,
        TextBox,
        Header,
        HeaderTags,
        Divider,
        showToast,
    },
    plugin: { store },
} = shelter;
export const AddDetectableModal = (props: { close: () => void }) => {
    const [appName, setAppName] = createSignal("");
    const [appId, setAppId] = createSignal("");
    const [executable, setExecutable] = createSignal("");
    const [enabled, setEnabled] = createSignal(true);

    function save() {
        if (!appName().trim() || !appId().trim() || !executable().trim()) {
            return showToast({
                title: "Missing fields",
                content: "Please fill in all fields before adding.",
                duration: 3000,
            });
        }
        const current = store.settings.detectables || [];
        const detectable = {
            name: appName().trim(),
            id: appId().trim(),
            executable: executable().trim(),
            enabled: enabled(),
        };
        current.push(detectable);
        store.settings.detectables = current;
        window.legcord.rpc.addDetectable(detectable);
        props.close();
    }

    return (
        <ModalRoot size={ModalSizes.SMALL}>
            <ModalHeader close={props.close}>Add Detectable Application</ModalHeader>
            <ModalBody>
                <Header tag={HeaderTags.H5}>App Name</Header>
                <TextBox value={appName()} onInput={setAppName} placeholder="e.g. Discord" />
                <Divider mt mb />
                <Header tag={HeaderTags.H5}>App ID</Header>
                <TextBox value={appId()} onInput={setAppId} placeholder="e.g. 1234567890" />
                <Divider mt mb />
                <Header tag={HeaderTags.H5}>Executable</Header>
                <TextBox value={executable()} onInput={setExecutable} placeholder="e.g. Discord.exe" />
                <Divider mt mb />
                <label style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                    <input
                        type="checkbox"
                        checked={enabled()}
                        onChange={(e) => setEnabled((e.target as HTMLInputElement).checked)}
                    />
                    Enabled
                </label>
            </ModalBody>
            <ModalConfirmFooter confirmText="Add" onConfirm={save} close={props.close} />
        </ModalRoot>
    );
};
