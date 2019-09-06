const {ccclass, property} = cc._decorator;

@ccclass
export default class ObjectPool extends cc.Component {
    public static instance:ObjectPool;
    private prefabs = new Map();
    private pool = new Map();


    onLoad(){
        ObjectPool.instance = this;
    }

    /**
     * 初始化对象池
     * @param cb 回调 不需要可以传null
     */
    public Init(cb:Function){
        cc.loader.loadResDir("objpool", function (err, assets) {
            if(!err){
                for(let i = 0; i < assets.length; i++){
                    ObjectPool.instance.prefabs.set(assets[i].name, assets[i]);
                }
                if(cb != null)cb();
            }
        });
    }

    /**
     * 通过对象池创建物体
     * @param key 物体的名字 需要被对象池创建的物体请放在resources/objpool文件夹下
     * @param parent 父物体
     * @param x x轴位置
     * @param y y轴位置
     * @param z 图层
     */
    public CreateObject(key:string,parent:cc.Node,x:number,y:number,z:number){
        if(this.prefabs.has(key)){
            let o:cc.Node;
            if(this.pool.has(key)){
                let temp:Array<cc.Node> = this.pool.get(key);
                o = temp.pop();
                if(temp.length <= 0){
                    this.pool.delete(key);
                }
            }else{
                o = cc.instantiate(this.prefabs.get(key));
            }
            o.setParent(parent);
            o.setPosition(x,y);
            o.zIndex = z;
            o.active = true;
            return o;
        }else return null;
    }

    /**
     * 回收物体
     * @param obj 待回收的物体
     */
    public ReturnObject(obj:cc.Node){
        let key = obj.name;
        obj.setParent(this.node);
        obj.active = false;
        if(this.pool.has(key)){
            this.pool.get(key)[this.pool.get(key).length] = obj;
        }else{
            let temp:Array<cc.Node> = new Array<cc.Node>();
            temp[0] = obj;
            this.pool.set(key,temp);
        }
    }
}
