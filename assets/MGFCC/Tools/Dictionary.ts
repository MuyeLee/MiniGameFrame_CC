
export default class Dictionary<K, V>{
    private keys:Array<K> = [];
    private values:Array<V> = [];

    /**
     * 存储数据
     * @param key 数据key
     * @param value 数据
     */
    public put(key:K,value:V){
        let index = 0;
        while(index < this.keys.length){
            if(this.keys[index] == key){
                this.keys[index] = key;
                this.values[index] = value;
                return true;
            }
            index++;
        }
        this.keys[this.keys.length] = key;
        this.values[this.values.length] = value;
        return true;
    }

    /**
     * 获取数据
     * @param key 数据key
     */
    public get(key:K){
        let index = 0;
        while(index < this.keys.length){
            if(this.keys[index] == key){
                return this.values[index];
            }
            index++;
        }
        return null;
    }

    /**
     * 删除数据
     * @param key 数据key 
     */
    public remove(key:K){
        let index = 0;
        while(index < this.keys.length){
            if(this.keys[index] == key){
                this.keys.splice(index,1);
                this.values.splice(index,1);
                return true;
            }
            index++;
        }
        return false;
    }

    /**
     * 清空字典
     */
    public clear(){
        this.keys.splice(0,this.keys.length);
        this.values.splice(0, this.values.length);
    }

    /**
     * 检测
     * @param key 数据key
     */
    public containkey(key:K){
        let index = 0;
        while(index < this.keys.length){
            if(this.keys[index] == key)return true;
            index++;
        }
        return false;
    }

    /**
     * 获取全部数据
     */
    public getValues(){
        return this.values.slice(0);
    }

    /**
     * 获取全部key
     */
    public getKeys(){
        return this.keys.slice(0);
    }

    public getCount():number{
        return this.keys.length;
    }
}
