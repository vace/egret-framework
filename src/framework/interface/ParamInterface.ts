module v{
    
    /**
     * loading config
     */
    export interface resConfigInterface{
        loadingScene?:string,
        url?:string,
        root?:string,
        type?:string,
        loadingGroup?:string,
        retry?:number,
        thread?:number
    }
    
    export interface MakeMoiveClipInterface extends v.MoiveClipUtilInterface{
        data:string,
        texture:string,
        animate:string
    }
    
    export interface AnimateParamInterface{
        // 等待时间
        delay?:number,
        // 等待的时候是否设置 visable 为false
        hide?:boolean,
        // 动画执行时间
        duration?:number,
        // 动画过渡曲线
        ease?:Function
        
        
    }
}