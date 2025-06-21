import type { ProcessInfo } from "arrpc";
import { For, createSignal } from "solid-js";
import { sleep } from "../../../common/sleep.js";
import { Dropdown } from "../components/Dropdown.jsx";
import classes from "./RegisteredGames.module.css";
const {
    ui: { Header, HeaderTags, Divider, Button, ButtonSizes },
} = shelter;

export function RegisteredGamesPage() {
    const [detectables, setDetectables] = createSignal<ProcessInfo[]>();
    const [selectedDetectable, setSelectedDetectable] = createSignal("");
    function getDetectables() {
        window.legcord.rpc.refreshProcessList();
        sleep(500).then(() => {
            setDetectables(window.legcord.rpc.getProcessList());
        });
    }
    getDetectables();
    function addGame() {
        // Logic to add a game
        console.log("Game added");
    }
    return (
        <>
            <Header tag={HeaderTags.H1}>Registered Games</Header>
            <Divider mt mb />
            <div class={classes.addBox}>
                <Dropdown
                    value={selectedDetectable()}
                    onChange={(e) => {
                        const detectable = e.currentTarget.value;
                        if (detectable === "refresh") {
                            getDetectables();
                            setSelectedDetectable("");
                            console.log("Detectables refreshed");
                        } else {
                            console.log("Selected detectable:", detectable);
                            setSelectedDetectable(e.currentTarget.value);
                        }
                    }}
                >
                    <For each={detectables()}>
                        {(process: ProcessInfo) => <option value={process[1]}>{process[1]}</option>}
                    </For>
                    <option value={"refresh"}>Refresh list</option>
                </Dropdown>
                <Button size={ButtonSizes.MEDIUM} onClick={addGame}>
                    Add
                </Button>
            </div>
        </>
    );
}
