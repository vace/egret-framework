module v{
    export class Scene extends egret.DisplayObjectContainer implements v.SceneInterface{
        /**
         * 缓存的refs,缓存的ref必须是displayObject
         */
        protected _refs:SceneRefInterface = {}
        
        
        stageWidth:number
        stageHeight:number
        
        constructor(){
            super()
            this.stageWidth = App.stage.stageWidth
            this.stageHeight = App.stage.stageHeight
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
        
        tween(){
            
        }
        
        /**
         * 提供框架内部的一些快捷方法
         */
        /**
         * 添加一个bitmap
         */
        addBitmap(resName,attrs:v.DisplayUtilsInterface={}):egret.Bitmap{
            var bitmap = v.fast.createBitmap(resName,attrs)
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
         * 添加bitmap text 文本
         */
        addBitmapText(fntName,attrs:v.BitmapTextUtilsInterfae={}){
            var bitmapText = v.fast.createBitmapText(fntName,attrs)
            this.addChild(bitmapText)
            if(attrs.ref){
                this.setRef(attrs.ref,bitmapText)
            }
            return bitmapText
        }
        
        /**
         * 创建一个movieClip影集
         */
        addMovieClip(attrs:v.MakeMoiveClipInterface){
            var {data,texture,animate} = attrs
            var movie = v.fast.createMovieClip(data,texture,animate)
            
            // 删除无用属性
            delete attrs.data
            delete attrs.texture
            delete attrs.animate

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
        addShape(attrs:v.DisplayUtilsInterface = {}){
            var shape = v.fast.createShape(attrs)
            this.addChild(shape)
            if(attrs.ref){
                this.setRef(attrs.ref,shape)
            }
            return shape
        }

        /**
         * 新建一个组
         */
        addGroup(attrs:v.DisplayUtilsInterface = {}):egret.DisplayObjectContainer{
            var container = new egret.DisplayObjectContainer
            v.utils.set(container,attrs)
            this.addChild(container)
            if(attrs.ref){
                this.setRef(attrs.ref,container)
            }
            return container
        }
        
        /**
         * 新建 sprite
         */
        addSprite(attrs:v.DisplayUtilsInterface = {}):egret.DisplayObjectContainer{
            var sprite = new egret.Sprite
            v.utils.set(sprite,attrs)
            this.addChild(sprite)
            if(attrs.ref){
                this.setRef(attrs.ref,sprite)
            }
            return sprite
        }
        
        
        /**
         * 事件快速处理器
         */
        
        /**
         * 快速绑定事件,返回事件解绑器
         */
        on(ele:egret.DisplayObject,type:string,listener:Function){
            ele.addEventListener(type,listener,this,false)
            return ()=>{
                ele.removeEventListener(type,listener,this,false)
            }
        }
        
        /**
         * 事件解绑,返回事件激活
         */
        off(ele:egret.DisplayObject,type:string,listener:Function){
            ele.removeEventListener(type,listener,this,false)
            return ()=>{
                ele.addEventListener(type,listener,this,false)
            }
        }
    }
}