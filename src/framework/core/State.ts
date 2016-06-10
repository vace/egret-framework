module v{
    /**
     * 游戏状态管理机
     */
    export class State extends v.BaseInstance{
        /**
         * 当前已经注册的所有场景
         */
        private _senceMaps:v.SceneMap[] = []
        /**
         * 当前运行的场景
         */ 
        private _currentSence:v.Scene
        /**
         * 当前运行的场景key
         */
        private _currentKey:string
        constructor(){
            super()
        }
        
        get scene():v.Scene{
            return this._currentSence
        }
        
        register(...args:Object[]):State{
            args.forEach(scene=>this.addScene(scene))
            return this
        }
        
        addScene(factory){
            if(!this.hasScene(factory.key)){
                this._senceMaps.push({
                    key:factory.key,
                    factory:factory,
                    // 第一次使用时再初始化
                    _instance:null
                })
            }
            return this
        }
        
        hasScene(sceneKey:string):boolean{
            return this._senceMaps.some(map=>map.key === sceneKey)
        }
        
        getScene(sceneKey:string):v.SceneMap{
            for(var i = 0 , _len = this._senceMaps.length ; i < _len ; i++){
                if(this._senceMaps[i].key === sceneKey){
                    return this._senceMaps[i]
                }
            }
            throw new Error(`${sceneKey} is not found in SENCE_MAPS`)
        }
        
        public set state(state){
            this._chooseState(state)
        }
        
        
        private _chooseState(state:string){
            var {_currentSence} = this
            // 移除现有的sence
            if (_currentSence && _currentSence.$parent){
                _currentSence.destory()
                _currentSence.$parent.removeChild(_currentSence)
            }
            // 重置state
            var current:v.Scene
            var next = this.getScene(state)
            var instance = next._instance
            if (!instance){
                instance = next._instance = <v.Scene> new next.factory()
                instance.create()
            }
            instance.reset()
            this._currentKey = state
            App.stage.addChild(instance)
            this._currentSence = instance
            return instance
        }
    }
}