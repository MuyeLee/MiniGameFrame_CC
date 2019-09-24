import SocketManager from "./SocketManager";
import SocketProtocol from "./SocketProtocol";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SocketRequest extends cc.Component {

    /**
     * 进入游戏
     * @param uid 玩家id
     */
    public static EntryGame(uid:number){
        let request = { "protocol": SocketProtocol.ENTRYGAME, "uid": uid };
        SocketManager.send(JSON.stringify(request));
    }

    /**
     * 发送心跳
     */
    public static HeartBeat(){
        let request = { "protocol": SocketProtocol.HEARTBEAT};
        SocketManager.send(JSON.stringify(request));
    }
}
