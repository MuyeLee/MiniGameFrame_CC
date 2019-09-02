import PanelBase from "../Base/PanelBase";
import UICenter from "../Base/UICenter";
import { UIAnimType } from "../Base/UIAnimType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestBPanel extends PanelBase {
    protected init(){
        this.BindButton(this.node,"TestButton",()=>{
            UICenter.instance.OpenPanel("TestAPanel",UIAnimType.ALPHA);
        },true,false);
    }
}
