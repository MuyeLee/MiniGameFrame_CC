const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeTools {
    /**
     * 获取当前时间戳
     * @param isMicrosecond 是否获取毫秒级时间戳
     */
    public static GetCurrentTimestamp(isMicrosecond:boolean){
        let ts:number = (new Date).getTime();
        if(isMicrosecond){
            return ts;
        }else{
            return Math.floor(ts*0.001);
        }
    }

    /**
     * 计算两个时间戳相差的时间，小时:分钟:秒格式
     * @param ts1 时间戳-大数
     * @param ts2 时间戳-小数
     */
    public static CompareToTimestamp(ts1:number, ts2:number){
        if(ts1 > 9999999999)ts1 = Math.floor(ts1*0.001);
        if(ts2 > 9999999999)ts2 = Math.floor(ts2*0.001);

        let temp:number = ts1 - ts2;
        if(temp <= 0){
            return {state:false,timer:"00:00:00"};
        }
        else {
            let seconds:number = temp % 60;
            let minutes:number = ((temp - seconds) / 60) % 60;
            let hour:number = Math.floor(temp/3600);

            let timer = (hour > 9?"" + hour:"0" + hour) + (minutes > 9?":" + minutes:":0" + minutes) + (seconds > 9?":" + seconds:":0" + seconds);
            return {state:true,timer:timer};
        }
    }

    /**
     * 获取短日期 年月日 如20190903 适用于比较时间前后关系
     */
    public static GetShortDate(){
        let date = new Date();
        return date.getUTCFullYear() + "" + ((date.getMonth()+1) > 9? (date.getMonth()+1):"0"+(date.getMonth()+1)) + "" + ((date.getDate()+1) > 9? date.getDate():"0"+date.getDate());
    }

    /**
     * 时间戳转换为短日期
     * @param ts 时间戳
     */
    public static TimestampToShortDate(ts:number){
        let date = new Date();
        if(ts<10000000000){
            ts *= 1000;
        }

        date.setTime(ts);
        
        return date.getUTCFullYear() + "" + ((date.getMonth()+1) > 9? (date.getMonth()+1):"0"+(date.getMonth()+1)) + "" + ((date.getDate()+1) > 9? date.getDate():"0"+date.getDate());
    }
}
