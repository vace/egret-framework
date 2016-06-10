module v{
    
    /**
     * 单例模型基类
     */
    
    export class BaseInstance{
        public static getInstance(...args:any[]):any{
            var Class:any = this
            if (!Class._instance){
                var arglen = args.length
                if (arglen === 0){
                    Class._instance = new Class
                }else if(arglen === 1){
                    Class._instance = new Class(args[0])
                }else if(arglen === 2){
                    Class._instance = new Class(args[0],args[1])
                }else{
                    Class._instance = new Class(...args)
                }
            }
            return Class._instance
        }
    }
}