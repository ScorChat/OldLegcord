// this file is executed in the utility process
// check window.ts for more details
// see more here https://www.electronjs.org/docs/latest/api/utility-process
import RPCServer from "arrpc";

const RPC = new RPCServer();

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
