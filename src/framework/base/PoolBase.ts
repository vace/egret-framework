module v{

	/**
	 * 对象池基类
	 */

    export class PoolBase extends egret.HashObject{
        /**
         * [key 对象缓存名称,一类的key为不同的缓存名称]
         * @type {string}
         */
        public static key:string = 'game_object'
        /**
         * [onCreate 对象创建回调]
         */
        public onCreate():void{}
        /**
         * [onReset 对象初始化回调]
         */
        public onReset():void{}
        /**
         * [onDestory 对象销毁回调]
         */
        public onDestory():void{}
        
    }
}