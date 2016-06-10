module v{
    export class Scene extends egret.DisplayObjectContainer implements v.SceneInterface{
        /**
         * 缓存的refs,缓存的ref必须是displayObject
         */
        protected _refs:SceneRefInterface = {}

        constructor(){
            super()
            // 注册当前的senceMap
            this.addEventListener(egret.Event.ENTER_FRAME,this.update,this,false)
        }
        
        /**
         * 场景创建回调
         */
        create(){}
        /**
         * 场景初始化回调
         */
        reset(){}
        /**
         * 场景更新
         */
        update(){}
        /**
         * 场景销毁
         */
        destory(){}

        
        /**
         * 增加当前实例的ref
         */
        setRef<T extends egret.DisplayObject>(ref,value:T):void{
            if(this._refs[ref]){
                egret.warn(`ref [${ref}] is existing`)
            }
            this._refs[ref] = value
        }
        
        /**
         * 获取ref
         */
        getRef<T extends egret.DisplayObject>(refName:string):T{
            if(this._refs[refName]){
                return this._refs[refName]
            }
            egret.warn(`ref [${refName}] is not existing`)
        }
        /**
         * 提供框架内部的一些快捷方法
         */
        /**
         * 添加一个bitmap
         */
        addBitmap(resName,attrs:v.DisplayUtilsInterface={}):egret.Bitmap{
            var bitmap = v.fast.createBitmap(resName)
            v.utils.set(bitmap,attrs)
            this.addChild(bitmap)
            if(attrs.ref){
                this.setRef(attrs.ref,bitmap)
            }
            return bitmap
        }
        /**
         * 添加一段文本
         */
        addTextField(attrs:v.TextFieldUtilsInterface={}){
            var text = v.fast.createTextField(attrs)
            this.addChild(text)
            if(attrs.ref){
                this.setRef(attrs.ref,text)
            }
            return text
        }
        
        /**
         * 创建一个movieClip影集
         */
        addMovieClip(dataResName:string,textureResName:string,animateName:string,attrs:v.MoiveClipUtilInterface = {}){
            var movie = v.fast.createMovieClip(dataResName,textureResName,animateName)
            v.utils.set(movie,attrs)
            this.addChild(movie)
            if(attrs.ref){
                this.setRef(attrs.ref,movie)
            }
            return movie
        }
        
        /**
         * 新建一个Shape
         */
        addShape(attrs:v.DisplayUtilsInterface){
            var shape = v.fast.createShape(attrs)
            this.addChild(shape)
            if(attrs.ref){
                this.setRef(attrs.ref,shape)
            }
            return shape
        }
    }
}