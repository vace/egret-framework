module v{
    
    /**
     * 基础的loading 层
     */
    
    export class Loading extends Scene{
        
        public static key:string = 'base_loading'
        
        constructor(){
            super()
            this.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this._onGroupProgress,this)
        }
        
        _onGroupProgress(e:RES.ResourceEvent){
            this.onProgress(e.itemsLoaded,e.itemsTotal)
        }
        onProgress(itemsLoaded:number,itemsTotal:number){
            console.log([itemsLoaded,itemsTotal])
        }
    }
}