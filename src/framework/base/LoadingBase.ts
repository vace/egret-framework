module v{
    
    /**
     * 基础的loading 层
     */
    
    export class LoadingBase extends Scene{
        
        public static key:string = 'v_base_loading'
        
        constructor(){
            super()
            this.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this._onGroupProgress,this)
        }
        
        /**
         * [create 场景创建回调,请在继承子类覆盖]
         */
        create(){
            this.addTextField({
                ref:'loading_text',
                text:'资源正在加载中',
                width:this.stageWidth,
                textAlign:'center',
                y:this.stageHeight / 2
            })
        }
        
        private _onGroupProgress(e:RES.ResourceEvent){
            this.onProgress(e.itemsLoaded,e.itemsTotal)
        }

        /**
         * [onProgress 进度回调事件]
         * @param {number} itemsLoaded [已经加载数量]
         * @param {number} itemsTotal  [资源总数量]
         */
        onProgress(itemsLoaded:number,itemsTotal:number){
            this.getRef<egret.TextField>('loading_text').text = `资源加载中 [ ${itemsLoaded} / ${itemsTotal} ] `
            // console.log([itemsLoaded,itemsTotal])
        }
    }
}