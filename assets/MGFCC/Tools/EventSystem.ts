const { ccclass } = cc._decorator;

@ccclass
export default class EventSystem extends cc.Component {

    //单例模式
    private static instance: EventSystem;

    onLoad() {
        EventSystem.instance = this;
        cc.game.addPersistRootNode(EventSystem.instance.node);
    }

    /**
     * 注册事件
     * @param event_name 事件名字
     * @param callback 事件回调
     * @param caller 执行域
     */
    public static on(event_name: string, callback: Function, caller: any) {
        EventSystem.instance.node.on(event_name, callback, caller);
    }

    /**
     * 解绑事件
     * @param event_name 事件名字
     * @param callback 事件回调
     * @param caller 执行域
     */
    public static off(event_name: string, callback: Function, caller: any) {
        EventSystem.instance.node.off(event_name, callback, caller);
    }

    /**
     * 广播事件
     * @param event_name 事件名字
     * @param arg1 参数1
     * @param arg2 参数2
     * @param arg3 参数3
     * @param arg4 参数4
     * @param arg5 参数5
     */
    public static broadcast(event_name: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        EventSystem.instance.node.emit(event_name, arg1, arg2, arg3, arg4, arg5);
    }
}
