import NetConfig from "../NetConfig";
import Dictionary from "../../Tools/Dictionary";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SocketManager extends cc.Component {
    /**
     * 当前的WebSocket对象
     */
    private static _socket:WebSocket;

    /**
     * 回调事件的字典
     */
    private static _socket_events:Dictionary<number,Function>;

    /**
     * websocket连接
     * @param _open 连接成功回调
     * @param _error 连接错误回调
     * @param _close 关闭连接回调
     * @param _response 接收到消息回调
     */
    public static connect(_open:Function, _error:Function, _close:Function, _response:Function){
        if(SocketManager._socket == null){
            SocketManager._socket = new WebSocket(NetConfig.websocket_ip);
            SocketManager._socket_events = new Dictionary<number,Function>();

            SocketManager._socket.onopen = ()=>{
                _open();
            }

            SocketManager._socket.onerror = (err)=>{
                _error(err);
            }

            SocketManager._socket.onclose = (err)=>{
                _close(err);
            }

            SocketManager._socket.onmessage = (response)=>{
                let data = JSON.parse(response.data);
                if(SocketManager._socket_events.containkey(data.protocol)){
                    SocketManager._socket_events.get(data.protocol)(data);
                }
                else if(_response != null){
                    _response(data)
                }
            }
        }
    }
 
    /**
     * 注册事件
     * @param protocol 事件的识别id
     * @param callback 事件回调
     */
    public static register(protocol:number, callback:Function){
        SocketManager._socket_events.put(protocol, callback);
    }

    /**
     * 向服务器发送消息
     * @param msg 消息内容
     * @return 发送消息成功返回true
     */
    public static send(msg:string){
        if(SocketManager._socket.readyState == 1){
            SocketManager._socket.send(msg);
            return true;
        }else{
            return false;
        }
    }
}
