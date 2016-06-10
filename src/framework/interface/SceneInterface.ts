module v{
    export interface SceneInterface{
        /**
         * 场景key
         */
        // static key:string,
        /**
         * 场景预加载
         */
        // preload():void,
        /**
         * 场景创建
         */
        create():void,
        /**
         * 场景初始化
         */
        reset():void,
        /**
         * 场景帧事件更新
         */
        update(time?:number):void,
        /**
         * 场景销毁
         */
        destory():void
    }
    
    export interface SceneMap{
        key:string,
        factory:any,
        _instance?:v.Scene
    }
}