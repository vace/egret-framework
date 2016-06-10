module v{
    
    /**
     * 注 : 每次只能加载一个分组
     */
    
    enum STATUS{
        // 资源根未加载,resource.json未加载
        NOT_START,
        // resource.json加载成功
        READY,
        // 加载loading需要的资源
        LOAD_LOADING,
        // loading 所需要的资源以及成功加载
        LOADED_LOADING,
        // 加载组资源
        LOAD_GROUP,
        // 组已经加载完成
        LOADED_GROUP
    }
    
    export class Res extends BaseInstance{
        
        /**
         * 资源加载配置文件
         */
        private _resourceConfig:resConfigInterface = {
            // loading 接管场景
            loadingScene:null,
            // 当加载其他分组之前显示loading需要提前加载的选项,loading
            loadingGroup:'loading',
            // 配置文件路径(resource.json的路径)。
            url:'default.res.json',
            // 资源根路径。配置中的所有url都是这个路径的相对值。最终url是这个字符串与配置里资源项的url相加的值
            root:'resource/',
            // 配置文件的格式。确定要用什么解析器来解析配置文件。默认"json"
            type:'json',
            // 加载失败后的尝试次数
            retry:3,
            // 设置最大并发加载线程数量
            thread:2
        }
        
        private _status = STATUS.NOT_START
        
        private _group:string
        private _state:string
        private _loading:string
        private _loadingGroup:string
        private _onSuccess:Function = (e)=>{}

        preload(group:string):Res{
            this._group = group
            return this
        }
        
        /**
         * 当preload 中的group加载完成后切换state
         */
        state(state:string):Res{
            this._state = state
            return this
        }
        
        /**
         * 指定承接loading的view
         */
        loading(state:string,loadingGroup?:string):Res{
            this._loading = state
            this._loadingGroup = loadingGroup
            return this
        }
        
        /**
         * 当group加载完成后的回调
         */
        success(cb:Function){
            this._onSuccess = cb
            return this
        }
        
        /**
         * 开始执行加载
         */
        start(){
            var {_status,_group,_state,_loading,_loadingGroup,_onSuccess,_resourceConfig} = this
            
            // 未开始,启动加载资源根路径文件
            if (_status === STATUS.NOT_START){
                RES.loadConfig(_resourceConfig.root + _resourceConfig.url,_resourceConfig.root,_resourceConfig.type)
            }else if(_status === STATUS.READY){
                // 配置资源就绪,开始加载分组
                var preload_loading = _loadingGroup || _resourceConfig.loadingGroup
                if(preload_loading && !RES.isGroupLoaded(preload_loading)){
                    // 加载loading需要的资源分组,给与最高的加载优先级
                    this._status = STATUS.LOAD_LOADING
                    RES.loadGroup(preload_loading,100)
                }else{
                    // 不需要loading
                    this._status = STATUS.LOADED_LOADING
                    this.start()
                }
            }else if(_status === STATUS.LOADED_LOADING){
                // 当前分组没有加载的情况下,展示loading
                if (!RES.isGroupLoaded(_group)){
                    var loading_scene = _loading || _resourceConfig.loadingScene 
                    // loading 需要的资源已经加载完成,展示loading承接面板
                    if (loading_scene){
                        App.state.state = loading_scene
                    }
                    // 开始加载当前场景需要的分组
                    RES.loadGroup(_group)
                }else{
                    this._status = STATUS.LOADED_GROUP
                }
            }else if(_status === STATUS.LOADED_GROUP){
                // 如果需要加载新场景,则调整到新场景
                if (_state){
                   App.state.state = _state 
                }
                // 流程全部结束,重置全部状态
                this._group = this._state = this._loading = this._loadingGroup = null
                this._onSuccess = (e) => {}
                this._status = STATUS.READY
            }
        }
        
        /**
         * 设置加载组属性
         */
        setConfig(config:resConfigInterface){
            v.utils.set(this._resourceConfig,config)
            
            if (config.retry){
                RES.setMaxRetryTimes(config.retry)
            }
            if (config.thread){
                RES.setMaxLoadingThread(config.thread)
            }
            return this
        }
        /**
         * 获取加载属性
         */
        getConfig(){
            return this._resourceConfig
        }

        constructor(){
            super()
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this._onConfigComplete,this,false)
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this._onConfigLoadError,this,false)
        }
        
        // 配置文件加载成功
        _onConfigComplete(e:RES.ResourceEvent){
            // 移除配置加载成功事件
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this._onConfigComplete,this,false)
            RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this._onConfigLoadError,this,false)
            // 添加资源组加载完成事件
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this._onGroupComplete,this,false)
            // 添加资源组加载失败事件
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this._onGroupLoadError,this,false)
            // 添加资源加载失败事件
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this._onItemLoadError,this,false)
            // 添加资源组加载进度事件
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this._onGroupProgress,this,false)
            
            // 重置当前res状态为ready
            this._status = STATUS.READY
            this.start()
        }
        
        // 资源配置加载完成,更改当前分组的状态
        _onGroupComplete(e:RES.ResourceEvent){
            var {_status,_group,_state,_loading,_loadingGroup,_resourceConfig} = this
            var preload_loading = _loadingGroup || _resourceConfig.loadingGroup
           // 是否为loading 需要的资源
           if (preload_loading && e.groupName === preload_loading){
               // 已经全部加载完成,执行下一步
               this._status = STATUS.LOADED_LOADING
               this.start()
           }else if(_group === e.groupName){
               // 需要的group 已经加载完成,调用回调事件
               this._onSuccess(e)
               // 切换状态
               this._status = STATUS.LOADED_GROUP
               this.start()
           }
        }
        
        _onGroupProgress(e:RES.ResourceEvent){
            if (e.groupName === this._group){
                var scene = App.state.scene
                if (scene){
                    scene.dispatchEvent(e)
                }
            }
        }
        
        _onConfigLoadError(e:RES.ResourceEvent){
            console.warn("Config has failed to load");
        }
        
        
        
        _onGroupLoadError(e:RES.ResourceEvent){
            console.warn("Group:" + e.groupName + " has failed to load")
            // Ignore the loading failed projects
            this._onGroupComplete(e)
        }
        
        _onItemLoadError(e:RES.ResourceEvent){
            console.warn(`Item load error name:[${e.resItem.name}],url[${e.resItem.url}]`)
        }
        
        
        
    }
}