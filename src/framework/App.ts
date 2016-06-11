class App{
    /**
     * 全局状态管理
     */
    public static get state():v.State{
        return v.State.getInstance()
    }
    
    public static get stage():egret.Stage{
        return egret.MainContext.instance.stage
    }
    
    public static get http():any{
        return v.http()
    }
    
    public static get res():v.Res{
        return v.Res.getInstance()
    }
    
    public static get pool():v.Pool{
        return v.Pool.getInstance()
    }
    
    
    public static warn(msg){
        console.warn(msg)
    }
}