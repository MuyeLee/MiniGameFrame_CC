const {ccclass, property} = cc._decorator;

@ccclass
export default class NetConfig{
    public static websocket_ip:string   = 'wss://user.dreamgear82.com/wwsBasketball';
    public static userver_ip:string     = 'https://www.dreamgear82.com/httpstransmit.php?port=20399';
    public static http_ip:string        = 'https://www.dreamgear82.com/httpstransmit.php?port=20307';
    public static appid:string          = '1202863';
    public static appkey:string         = '';
}
