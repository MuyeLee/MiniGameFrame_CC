const {ccclass, property} = cc._decorator;

@ccclass
export default class Tools{
    /**
     * 随机数
     * @param min 最小值
     * @param max 最大值
     */
    public static Random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
