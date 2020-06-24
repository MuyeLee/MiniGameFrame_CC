export default class IEnumerator extends cc.Component {
    private func:Function;

    private async = async function () {
        this.func();
    };

    constructor(func:Function){
        super();
        this.func = func;
    }

    /**
     * 开启携程
     */
    public start():boolean{
        if(this.func){
            this.async();
            return true;
        }
        return false;
    }

    /**
     * 
     * @param time 等待的时间(ms)
     */
    public static async waitForMilliseconds(time:number){
        await new Promise(function () {
            setTimeout(function () {}, time);
        })
    }
}