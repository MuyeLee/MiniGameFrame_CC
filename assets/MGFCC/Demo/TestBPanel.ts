import PanelBase from "../Base/PanelBase";
import UICenter from "../Base/UICenter";
import { UIAnimType } from "../Base/UIAnimType";
import SocketRequest from "../Net/WebSocket/SocketRequest";
import SocketManager from "../Net/WebSocket/SocketManager";
import SocketProtocol from "../Net/WebSocket/SocketProtocol";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestBPanel extends PanelBase {
    
    private label:cc.Label;

    protected init(){
        this.BindButton(this.node,"TestButton",()=>{
            UICenter.instance.OpenPanel("TestAPanel",UIAnimType.ALPHA);
        },true,false);
        
        this.label = this.BindText(this.node, 'Label', '');

        SocketManager.connect(this.connected.bind(this), this.connect_err.bind(this), this.connect_close.bind(this), this.connect_reponse.bind(this));
        SocketManager.register(SocketProtocol.ENTRYGAME,this.entry_game.bind(this));
        SocketManager.register(SocketProtocol.HEARTBEAT,this.heatbeat.bind(this));

        this.BindButton(this.node,"connect",()=>{
            SocketRequest.EntryGame(1202863);
        },true,true);

        this.BindButton(this.node,"heartbeat",()=>{
            SocketRequest.HeartBeat();
        },true,true);
    }

    private connected(){
        this.label.string = '已连接';
    }
    private connect_err(data){
        this.label.string = '连接错误：' + JSON.stringify(data);
    }
    private connect_close(data){
        this.label.string = '连接关闭：' + JSON.stringify(data);
    }

    private connect_reponse(data){
        console.log(data);
        this.label.string = '返回数据：' + JSON.stringify(data);
    }

    private entry_game(data){
        console.log(data);
        this.label.string = '返回数据：' + JSON.stringify(data);
    }

    private heatbeat(data){
        console.log(data);
        this.label.string = '返回数据：' + JSON.stringify(data);
    }


}
