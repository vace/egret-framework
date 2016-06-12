module v{

    /**
     * 对象池
     */
    export class Pool extends BaseInstance{
        
        constructor(){
            super()
        }

        /**
         * [_object_cache 对象缓存]
         * @type {Object}
         */
        _object_cache = {}
        
        /**
         * [produce 生产对象]
         * @param {any}    Factory [对象构造函数]
         * @param {[type]} ...args [对象参数]
         */
        public produce(Factory:any,...args){
            var key = Factory.key
            if (!key){
                throw new Error('Pool Object key can not be null')
            }
            var cache = this._object_cache
            if (!cache[key]){
                cache[key] = []
            }
            var result
            if(cache[key].length){
                result = cache[key].pop()
            }else{
                var len = args.length
                if (len === 0)
                    result = new Factory()
                else if (len === 1)
                    result = new Factory(args[0])
                else if (len === 2)
                    result = new Factory(args[0],args[1])
                else 
                    result = new Factory(...args)
                result.key = key
                result.onCreate()
            }
            result.onReset()
            return result
        }
        
        /**
         * [recycle 回收对象]
         * @param {PoolInterface} _class [已经初始化需要回收的对象]
         */
        public recycle(_class:PoolInterface){
            var key = _class.key,
                cache = this._object_cache
            if (!cache[key]){
                cache[key] = []
            }
            _class.onDestory()
            cache[key].push(_class)
            return _class
        }
        
    }
}