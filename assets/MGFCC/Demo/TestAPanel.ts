import PanelBase from "../Base/PanelBase";
import UICenter from "../Base/UICenter";
import { UIAnimType } from "../Base/UIAnimType";
import HttpRequest from "../Net/Http/HttpRequest";
import TimeTools from "../Tools/TimeTools";
import Coroutine from "../Tools/Coroutine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestAPanel extends PanelBase {
    private label: cc.Label;
    protected init() {
        this.BindButton(this.node, "TestButton", () => {
            UICenter.instance.OpenPanel("TestBPanel", UIAnimType.MINTOMAX);
        }, true, false);

        this.label = this.BindText(this.node, 'content', '');

        this.BindButton(this.node, 'GetServerTime', () => {
            HttpRequest.GetServerTime(this.GetServerTimeCb.bind(this));
        }, true, true);

        this.BindButton(this.node, 'GetUID', () => {
            HttpRequest.GetUID('testid', this.GetUIDCb.bind(this));
        }, true, true);

        this.test1();
        this.test2();
    }

    private GetServerTimeCb(data) {
        console.log(data);
        this.label.string = '时间：' + TimeTools.TimestampToShortDate(data.data);
    }

    private GetUIDCb(data) {
        console.log(data);
        this.label.string = 'uid：' + data.data;
    }

    async test1() {
        console.log("1");
        await Coroutine.WaitForTime(2000);
        console.log("3");
    }

    async test2() {
        await Coroutine.WaitForTime(1000);
        console.log("2");
    }
}
