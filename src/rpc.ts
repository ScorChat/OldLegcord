// this file is executed in the utility process
// check window.ts for more details
// see more here https://www.electronjs.org/docs/latest/api/utility-process
import RPCServer, { type GameList } from "arrpc";

const detectables: GameList = process.env.detectables ? JSON.parse(process.env.detectables) : [];
const RPC = new RPCServer(detectables);

RPC.on("activity", (data: string) => {
    console.log(data);
    const response = { type: "activity", data: data };
    process.parentPort.postMessage(JSON.stringify(response));
});
RPC.on("invite", (code: string) => {
    console.log(code);
    const response = { type: "invite", code: code };
    process.parentPort.postMessage(JSON.stringify(response));
});

process.parentPort.once("message", async (e) => {
    if (e.data.message === "refreshProcessList") {
        const processes = await RPC.getProcessesList();
        console.log(processes);
        const response = { type: "processList", data: processes };
        process.parentPort.postMessage(JSON.stringify(response));
    }
});
