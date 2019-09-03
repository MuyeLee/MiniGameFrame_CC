const {ccclass, property} = cc._decorator;

@ccclass
export default class ArchivingBase extends cc.Component {

    /**
     * 存储数据
     * @param key 数据键值
     * @param data 数据
     */    
    protected SaveData(key:string, data:string){
        cc.sys.localStorage.setItem(key, data);
    }

    /**
     * 获取字符型数据
     * @param key 数据键值
     * @param default_data 默认值
     */
    protected GetStringData(key:string, default_data:string){
        let data = cc.sys.localStorage.getItem(key);
        if(data)
        {
            return data;
        }else
        {   
            data = default_data;
            cc.sys.localStorage.setItem(key, default_data);
            return data;
        }
    }

    /**
     * 获取整数型数据
     * @param key 数据键值
     * @param default_data 默认值
     */
    protected GetIntData(key:string, default_data:number){
        let data = cc.sys.localStorage.getItem(key);
        if(data)
        {
            return parseInt(data);
        }else
        {   
            data = default_data;
            cc.sys.localStorage.setItem(key, default_data);
            return data;
        }
    }

    /**
     * 获取浮点型数据
     * @param key 数据键值
     * @param default_data 默认值
     */
    protected GetFloatData(key:string, default_data:number){
        let data = cc.sys.localStorage.getItem(key);
        if(data)
        {
            return parseFloat(data);
        }else
        {   
            data = default_data;
            cc.sys.localStorage.setItem(key, default_data);
            return data;
        }
    }

    /**
     * 存储Json类型数据
     * @param key 数据键值
     * @param data 数据
     */
    protected SaveJsonData(key:string, data){
        cc.sys.localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * 获取Json类型数据
     * @param key 数据键值
     * @param default_data 默认值
     */
    protected GetJsonData(key:string, default_data){
        let data = JSON.parse(cc.sys.localStorage.getItem(key));
        if(data)
        {
            return data;
        }else
        {   data = default_data;
            cc.sys.localStorage.setItem(key, JSON.stringify(data));
            return data;
        }
    }
}
