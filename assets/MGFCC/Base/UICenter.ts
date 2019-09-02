import PanelBase from "./PanelBase";
import { UIAnimType } from "./UIAnimType";

const {ccclass, property} = cc._decorator;


@ccclass
export default class UICenter extends cc.Component {
    public static instance:UICenter;

    private panel_map = new Map();
    protected last_panel:string;
    protected current_panel:string;

    private width:number;
    private height:number;

    onLoad () {
        this.width = cc.winSize.width;
        this.height = cc.winSize.height;
        UICenter.instance = this;
    }

    /**
     * 注册页面
     * @param panel 页面
     */
    public RegisterPanel(panel:PanelBase){
        if(this.panel_map.has(panel.node.name)){
            this.panel_map.set(panel.node.name, panel);
        }else{
            if (this.current_panel == null) {
                this.current_panel = panel.node.name;
                panel.OpenClick();
            }
            this.panel_map.set(panel.node.name, panel);
        }
    }

    /**
     * 注销界面
     * @param name 界面名字
     */
    public LogoutPanel(name:string){
        if(this.panel_map.has(name)){
            this.panel_map.delete(name);
        }
    }

    /**
     * 调用Panel内的方法
     * @param name panel名字
     * @param method 方法id
     * @param params 参数
     */
    public CallPanelMethod(name:string, method:number, params:any){
        if(this.panel_map.has(name)){
            this.panel_map.get(name).CallPanelMethod(method, params);
        }
    }

    /**
     * 打开页面
     * @param panel_name 页面名字
     * @param anim 页面出现动画
     */
    public OpenPanel(panel_name:string, anim:UIAnimType){
        if(panel_name == this.current_panel || !this.panel_map.has(this.current_panel))return;
        let temp_next:PanelBase = null;
        let temp_current:PanelBase = this.panel_map.get(this.current_panel);
        
        temp_current.CloseClick();
        if (this.panel_map.has(panel_name)){
            temp_next = this.panel_map.get(panel_name);
        }else{
            let temp = this.node.getChildByName(panel_name);
            if(temp == null){temp_current.OpenClick();return;}
            temp_next = temp.getComponent(PanelBase);
            temp_next.RegisterPanel();
        }
        switch (anim)
        {
            case UIAnimType.NONE:
                this.NoneAnim(temp_current, temp_next);
                break;
            case UIAnimType.SUPERIMPOSED:
                this.Superimposed(temp_current, temp_next);
                break;
            case UIAnimType.LEFTTORIGHT:
                this.LeftToRight(temp_current, temp_next);
                break;
            case UIAnimType.RIGHTTOLEFT:
                this.RightToLeft(temp_current, temp_next);
                break;
            case UIAnimType.MINTOMAX:
                this.MinToMax(temp_current, temp_next);
                break;
            case UIAnimType.ALPHA:
                this.AlphaShow(temp_current, temp_next);
                break;
        }
    }

    /**
     * 无动画
     * @param current 当前页面
     * @param next 下个页面
     */
    private NoneAnim(current:PanelBase, next: PanelBase)
    {
        current.node.active = false;
        next.node.setPosition(0,0);
        next.node.active = true;
        this.last_panel = this.current_panel;
        this.current_panel = next.node.name;
        next.OpenClick();
    }

    /**
     * next界面盖在当前界面上
     * @param current 当前页面
     * @param next 下个页面
     */
    private Superimposed(current:PanelBase, next: PanelBase){
        next.node.setPosition(0,0);
        next.node.active = true;
        this.last_panel = this.current_panel;
        this.current_panel = next.node.name;
        next.OpenClick();
    }

    /**
     * 从左向右
     * @param current 当前页面
     * @param next 下个页面
     */
    private LeftToRight(current:PanelBase, next: PanelBase){
        next.CloseClick();
        next.node.setPosition(-this.width, 0);
        next.node.active = true;

        current.node.runAction(
            cc.sequence(cc.moveTo(0.25, 0, 0), cc.callFunc(() => {
                current.node.active = false;
                current.node.setPosition(0, 0);
            }))
        );
        next.node.runAction(
            cc.sequence(cc.moveTo(0.25, 0, 0), cc.callFunc(() => {
                next.OpenClick();
            }))
        );
        this.last_panel = this.current_panel;
        this.current_panel = next.node.name;
    }

    /**
     * 从右向左
     * @param current 当前页面
     * @param next 下个页面
     */
    private RightToLeft(current:PanelBase, next: PanelBase){
        next.CloseClick();
        next.node.setPosition(this.width, 0);
        next.node.active = true;

        current.node.runAction(
            cc.sequence(cc.moveTo(0.25, -this.width, 0), cc.callFunc(() => {
                current.node.active = false;
                current.node.setPosition(0, 0);
            }))
        );
        next.node.runAction(
            cc.sequence(cc.moveTo(0.25, 0, 0), cc.callFunc(() => {
                next.OpenClick();
            }))
        );
        this.last_panel = this.current_panel;
        this.current_panel = next.node.name;
    }

    /**
     * 从小变大
     * @param current 当前页面
     * @param next 下个页面
     */
    private MinToMax(current:PanelBase, next: PanelBase){
        next.CloseClick();
        next.node.setPosition(0,0);
        next.node.setScale(0,0);
        next.node.active = true;

        current.node.runAction(
            cc.sequence(cc.scaleTo(0.25, 0), cc.callFunc(() => {
                current.node.active = false;
                current.node.setScale(1, 1);
            }))
        );
        next.node.runAction(
            cc.sequence(cc.scaleTo(0.25, 1), cc.callFunc(() => {
                next.OpenClick();
            }))
        );
        this.last_panel = this.current_panel;
        this.current_panel = next.node.name;
    }

    /**
     * 逐渐出现
     * @param current 当前页面
     * @param next 下个页面
     */
    private AlphaShow(current:PanelBase, next: PanelBase){
        next.CloseClick();
        next.node.setPosition(0,0);
        next.node.opacity = 0;
        next.node.active = true;
        current.node.runAction(
            cc.sequence(cc.fadeTo(0.25, 0), cc.callFunc(() => {
                current.node.opacity = 255;
                current.node.active = false;
            }))
        );
        next.node.runAction(
            cc.sequence(cc.fadeTo(0.25, 255), cc.callFunc(() => {
                next.OpenClick();
            }))
        );
        this.last_panel = this.current_panel;
        this.current_panel = next.node.name;
    }
}
