import HttpManager from "./HttpManager";
import NetConfig from "../NetConfig";
import HttpProtocol from "./HttpProtocol";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HttpRequest extends cc.Component {
    /**
     * 获取服务器时间
     * @param callback 回调方法
     */
    public static GetServerTime(callback:Function){
        let data = 'logic=' + HttpProtocol.GETSERVERTIME;
        HttpManager.POST(data,callback,true);
    }

    /**
     * 获取微信open id
     * @param js_code 调用微信接口获取
     * @param callback 回调方法
     */
    public static GetOpenId(js_code:string, callback:Function){
        let data = 'logic=' + HttpProtocol.GETOPENID + '&js_code='+js_code+'&appid=' + NetConfig.appid; 
        HttpManager.POST(data,callback,true);
    }

    /**
     * 获取游戏开关信息
     * @param callback 回调方法
     */
    public static GetGameSwitch(callback){
        let data = 'logic=' + HttpProtocol.GETSWITCH + "&appid="  + NetConfig.appid;
        HttpManager.POST(data,callback,true);
    }

    /**
     * 获取玩家id
     * @param unionid 玩家识别码,例如:微信小游戏中使用微信的OpenID
     * @param callback 回调方法
     */
    public static GetUID(unionid, callback){
        let data ='logic=' + HttpProtocol.GETUID + "&unionid=" + unionid + "&appid="  + NetConfig.appid;
        HttpManager.POST(data,callback,true);
    }

    /**
     * 存储玩家数据
     * @param key 数据密钥,客户端自行定义,从服务器获取数据时,需要使用key获取
     * @param data 需要保存的数据
     * @param uid 玩家id
     * @param callback 方法的回调
     */
    public static SaveData(key:string, data:string, uid:number, callback:Function){
        if(uid!=null){
            let method ='logic=' + HttpProtocol.SAVEDATA + "&key=" + key + "&data=" + data + "&uid=" + uid + "&appid="  + NetConfig.appid;
            HttpManager.POST(method,callback,true);
        }else{
            let err = {status:NetStat.DATAERROR};
            callback(err);
        }
    }

    /**
     * 获取玩家数据
     * @param key 数据密钥,客户端自行定义,从服务器获取数据时,与存储时的key对应
     * @param uid 玩家id
     * @param callback 方法的回调
     */
    public static GetData(key:string, uid:number, callback:Function){
        if(uid!=null){
            let method ='logic=' + HttpProtocol.GETDATA + "&key=" + key + "&uid=" + uid + "&appid="  + NetConfig.appid;
            HttpManager.POST(method,callback,true);
        }else{
            let err = {status:NetStat.DATAERROR};
            callback(err);
        }
    }

    /**
     * 上传排行榜数据
     * @param uid 玩家id
     * @param value 需要排列的值,只能是整数
     * @param rkname 排行榜名字,可以通过后台查询
     * @param uname 玩家名字
     * @param uhead 玩家头像
     * @param info 补充信息
     * @param callback 方法的回调
     */
    public static PutRankData(uid:number, value:number, rkname:string, uname:string, uhead:string, info:string, callback:Function){
        if(uid!=null){
            let method ='logic=' + HttpProtocol.PUTRANKDATA + "&uid=" + uid + "&value=" + value + "&rkname=" + rkname + "&uname=" + uname + "&uhead=" + uhead + "&info=" + info + "&appid="  + NetConfig.appid;
            HttpManager.POST(method,callback,true);
        }else{
            let err = {status:NetStat.DATAERROR};
            callback(err);
        }
    }

    /**
     * 获取排行榜
     * @param rkname 排行榜名字,可以通过后台查询
     * @param callback 方法的回调
     */
    public static GetRankList(rkname,callback){
        var method ='logic=' + HttpProtocol.GETRANKLIST + "&rkname=" + rkname + "&appid="  + NetConfig.appid;
        HttpManager.POST(method,callback,true);
    }
}
