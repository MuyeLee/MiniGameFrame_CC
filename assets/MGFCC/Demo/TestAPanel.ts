import PanelBase from "../Base/PanelBase";
import UICenter from "../Base/UICenter";
import { UIAnimType } from "../Base/UIAnimType";
import HttpRequest from "../Net/Http/HttpRequest";
import TimeTools from "../Tools/TimeTools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestAPanel extends PanelBase {
    private label:cc.Label;
    protected init(){
        this.BindButton(this.node,"TestButton",()=>{
            UICenter.instance.OpenPanel("TestBPanel",UIAnimType.MINTOMAX);
        },true,false);

        this.label = this.BindText(this.node,'content','');

        this.BindButton(this.node,'GetServerTime',()=>{
            HttpRequest.GetServerTime(this.GetServerTimeCb.bind(this));
        },true,true);

        this.BindButton(this.node,'GetUID',()=>{
            HttpRequest.GetUID('testid', this.GetUIDCb.bind(this));
        },true,true);
    }

    private GetServerTimeCb(data){
        console.log(data);
        this.label.string ='时间：' + TimeTools.TimestampToShortDate(data.data);
    }

    private GetUIDCb(data){
        console.log(data);
        this.label.string ='uid：' + data.data;
    }
}
