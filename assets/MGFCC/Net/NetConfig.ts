const {ccclass, property} = cc._decorator;

@ccclass
export default class NetConfig{
    public static websocket_ip:string   = 'wss://user.dreamgear82.com/wwsBasketball';
    public static userver_ip:string     = 'https://hcr-console.chuanqwx.com/universal-web/httpstransmit.php?port=20410';
    public static http_ip:string        = 'https://www.dreamgear82.com/httpstransmit.php?port=20307';
    public static appid:string          = '60817937';
    public static appkey:string         = '';
}
