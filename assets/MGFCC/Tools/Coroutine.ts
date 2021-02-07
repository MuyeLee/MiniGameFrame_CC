const { ccclass } = cc._decorator;

@ccclass
export default class Coroutine {
    /**
     * 等待
     * @param interval 等待时间(ms)
     */
    public static WaitForTime(interval: number) {
        return new Promise((resolve) => setTimeout(resolve, interval));
    }
}
