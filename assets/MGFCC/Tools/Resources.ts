export default class Resources{
    private static sprite_frame_map = new Map();
    private static prefab_map = new Map();

    /**
     * 加载图片资源
     * @param path 资源位置
     * @param sprite 需要给赋值的Sprite
     */
    public static LoadSpriteFrame(path:string,sprite:cc.Sprite) {
        if(this.sprite_frame_map.has(path)){
            if(sprite)sprite.spriteFrame = this.sprite_frame_map.get(path);
        }else{
            var self = this;
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if(!err){
                    if(sprite)sprite.spriteFrame = spriteFrame;
                    self.sprite_frame_map.set(path, spriteFrame);
                }
            });
        }
    }

    /**
     * 释放图片资源
     * @param path 资源位置
     */
    public static ReleaseSpriteFrame(path:string){
        if(this.sprite_frame_map.has(path)){
            this.sprite_frame_map.delete(path);
            cc.loader.releaseRes(path, cc.SpriteFrame);
        }
    }

    /**
     * 
     * @param path 加载预制体
     * @param node 需要给赋值的node
     * @param parent node的父物体
     * @param x x轴坐标
     * @param y y轴坐标
     * @param z z轴坐标
     */
    public static LoadPrefab(path:string, node:cc.Node, parent:cc.Node, x:number, y:number, z:number){
        if(this.prefab_map.has(path)){
            node = cc.instantiate(this.prefab_map.get(path));
            node.setParent(parent);
            node.setPosition(x, y, z);
        }else{
            var self = this;
            cc.loader.loadRes(path, function (err, prefab) {
                if(!err){
                    self.prefab_map.set(path,prefab);
                    node = cc.instantiate(prefab);
                    node.setParent(parent);
                    node.setPosition(x, y, z);
                }
            });
        }
    }

    /**
     * 释放预制体资源
     * @param path 资源位置
     */
    public static ReleasePrefab(path:string){
        if(this.prefab_map.has(path)){
            this.prefab_map.delete(path);
            cc.loader.releaseRes(path, cc.Prefab);
        }
    }
}
