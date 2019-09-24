import UICenter from "./UICenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PanelBase extends cc.Component {
    protected isClick:boolean;

    protected isInit:boolean;

    start () {
        this.RegisterPanel();
    }

    /**
     * 注册界面
     */
    public RegisterPanel(){
        if(!this.isInit){
            this.init();
            this.node.width = cc.winSize.width;
            this.node.height = cc.winSize.height;
            UICenter.instance.RegisterPanel(this);
            this.isInit = true;
        }
    }

    /**
     * 初始化界面，需要在具体的界面方法中重写
     */
    protected init(){}

    /**
     * 调用私用方法，需要在具体的界面方法中重写
     * @param method 方法id
     * @param params 参数
     */
    public CallPanelMethod(method:number, params:any) { }

    /**
     * 打开点击事件
     */
    public OpenClick(){
        this.isClick = true;
    }

    /**
     * 关闭点击事件
     */
    public CloseClick(){
        this.isClick = false;
    }

    /**
     * 获取点击事件状态
     */
    public GetClick(){
        return this.isClick;
    }

    /**
     * 绑定按键
     * @param parent 父物体
     * @param path 从父物体开始计算路径
     * @param cb 按钮调用的事件
     * @param isAnim 是否播放默认动画（放大缩小）
     * @param autoOpenClick 是否制动打开点击事件，如不打开则需要自己在回调中调用OpenClick(),否则UI点击事件将会被禁用
     */
    protected BindButton(parent:cc.Node, path:string, cb:Function, isAnim = true, autoOpenClick = false){
        let button:cc.Node;
        if (path == null) button = parent;
        else {
            button = parent.getChildByName(path);
        }
        if(button === null)return null;
        
        if(isAnim){
            button.on(cc.Node.EventType.TOUCH_END,()=>{
                if(this.isClick){
                    this.isClick = false;
                    button.runAction(
                        cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.callFunc(() => {
                            button.runAction(cc.sequence(cc.scaleTo(0.1, 1, 1), cc.callFunc(() => {
                                if (cb != null)
                                {
                                    cb();
                                    if (autoOpenClick)
                                    {
                                        this.isClick = true;
                                    }
                                }
                                else
                                {
                                    this.isClick = true;
                                }
                            })))
                        }))
                    );
                }
            });
        }else{
            button.on(cc.Node.EventType.TOUCH_END,()=>{
                if(this.isClick){
                    this.isClick = false;
                    if (cb != null)
                    {
                        cb();
                        if (autoOpenClick)
                        {
                            this.isClick = true;
                        }
                    }
                    else
                    {
                        this.isClick = true;
                    }
                }
            });
        }
        return button;
    }

    /**
     * 绑定图片
     * @param parent 父物体
     * @param path 从父物体开始计算路径
     */
    protected BindImage(parent:cc.Node, path:string){
        let sp:cc.Sprite;
        if (path == null) sp = parent.getComponent(cc.Sprite);
        else sp = parent.getChildByName(path).getComponent(cc.Sprite);
        return sp;
    }
    
    /**
     * 绑定文字框
     * @param parent 父物体
     * @param path 从父物体开始计算路径
     * @param content 默认内容
     */
    protected BindText(parent:cc.Node,path:string,content:string){
        let text:cc.Label;
        if (path == null) text = parent.getComponent(cc.Label);
        else text = parent.getChildByName(path).getComponent(cc.Label);
        if(content!=null)text.string = content;
        return text;
    }
}
