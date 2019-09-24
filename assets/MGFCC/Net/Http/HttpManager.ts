import NetConfig from "../NetConfig";

export default class HttpManager{
    /**
     * GET方法
     * @param data 方法参数
     * @param callback 回调
     * @param isUserver 是否是通用服务器方法
     * @return Json类型数据
     */
    public static GET(data: string, callback:Function, isUserver:boolean = false){
        let url;
        if(isUserver) url = NetConfig.userver_ip + '&logic=' + data;
        else url = NetConfig.http_ip + '&logic=' + data;
        let request = new XMLHttpRequest();
        request.onreadystatechange=()=>{
            if(request.readyState == 4 && (request.status >=200 && request.status < 300)){
                let response = request.responseText;
                if(callback != null){
                    callback(JSON.parse(response));
                }
            }
        }
        request.open('GET',url,true);
        request.send();
    }

    /**
     * POST方法
     * @param data 方法参数
     * @param callback 回调
     * @param isUserver 是否是通用服务器方法
     * @return Json类型数据
     */
    public static POST(data: string, callback:Function, isUserver:boolean = false){
        let url;
        if(isUserver) url = NetConfig.userver_ip;
        else NetConfig.http_ip;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 400)) {
                let response = xhr.responseText;
                if(callback != null){
                    callback(JSON.parse(response));
                }
            }
        };
        xhr.open("POST", url);
        xhr.send(data);
    }
}
