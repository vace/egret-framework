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
}