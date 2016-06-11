module v{
    export class Pool extends BaseInstance{
        
        constructor(){
            super()
        }
        _object_cache = {}
        
        /**
         * 生成对象
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
         * 回收对象
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