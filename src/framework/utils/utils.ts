module v{
    export class utils{
        static set<T>(obj:T,attr:Object = {}):T{
            for(var x in attr){
                if(attr.hasOwnProperty(x)){
                    obj[x] = attr[x]
                }
            }
            return obj
        }
        
        static random(min:number,max:number=0):number{
            return Math.random() * (max - min) + min;
		}
        

        static randomInt(min:number,max:number=0):number{
            if(arguments.length===1){
                [min,max] = [0,min];
            }
            return Math.floor(utils.random(min,max+1));
		}
        
        static uuid():string{
            var uuid = '',i,random
            for(i = 0;i < 32;i++) {
                random = Math.random() * 16 | 0;
                if(i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
            }
            return uuid
		}
        
        
        static roundDecimal(value:number,place:number):number{
            var placePow = Math.pow(10,place);
            return Math.round( value * placePow  ) / placePow;
        }
        
        static setAttrs<T>(display:T,attrs:TextFieldUtilsInterface = {}):T{
            for(var x in attrs){
               display[x] = attrs[x]
            }
            return display
        }
        
        static average(...args){
            return args.reduce((a,b)=>a+b) / args.length
        }
        
        
    }
}