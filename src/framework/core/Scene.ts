module v{

    /**
     * 场景基类,所有场景需要继承此基类
     */

    export class Scene extends egret.DisplayObjectContainer implements v.SceneInterface{
        /**
         * 缓存的refs,缓存的ref必须是displayObject
         */
        protected _refs:SceneRefInterface = {}

        /**
         * [_animateRefs 缓存动画对象集合]
         */
        protected _animateRefs = {}
        
        /**
         * [stageWidth 当前场景宽度]
         * @type {number}
         */
        stageWidth:number

        /**
         * [stageHeight 当前场景高度]
         * @type {number}
         */
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
        
        setAni(refName:string,display:any):v.Animate{
            var target = this.getRef(refName)
            return (this._animateRefs[refName] =  v.Animate.get(target))
        }
        
        getAni(refName):v.Animate{
            return this._animateRefs[refName]
        }
        
        setAniRef(refName):v.Animate{
            return this.setAni(refName,this.getRef(refName))
        }
        
        /**
         * 新增一个tween对象
         */
        tween(target):egret.Tween{
            return egret.Tween.get(target)
        }
        
        /**
         * 提供框架内部的一些快捷方法
         */
        /**
         * 添加一个bitmap
         */
        addBitmap(resName,attrs:v.DisplayUtilsInterface={},to?:egret.DisplayObjectContainer | egret.Sprite):egret.Bitmap{
            var bitmap = v.fast.createBitmap(resName,attrs)
            var target = to || this
            target.addChild(bitmap)
            if(attrs.ref){
                this.setRef(attrs.ref,bitmap)
            }
            return bitmap
        }
        /**
         * 添加一段文本
         */
        addTextField(attrs:v.TextFieldUtilsInterface={},to?:egret.DisplayObjectContainer | egret.Sprite){
            var text = v.fast.createTextField(attrs)
            var target = to || this
            target.addChild(text)
            if(attrs.ref){
                this.setRef(attrs.ref,text)
            }
            return text
        }
        
        /**
         * 添加bitmap text 文本
         */
        addBitmapText(fntName,attrs:v.BitmapTextUtilsInterfae={},to?:egret.DisplayObjectContainer | egret.Sprite){
            var bitmapText = v.fast.createBitmapText(fntName,attrs)
            var target = to || this
            target.addChild(bitmapText)
            if(attrs.ref){
                this.setRef(attrs.ref,bitmapText)
            }
            return bitmapText
        }
        
        /**
         * 创建一个movieClip影集
         */
        addMovieClip(attrs:v.MakeMoiveClipInterface,to?:egret.DisplayObjectContainer | egret.Sprite){
            var {data,texture,animate} = attrs
            var movie = v.fast.createMovieClip(data,texture,animate)
            
            // 删除无用属性
            delete attrs.data
            delete attrs.texture
            delete attrs.animate

            v.utils.set(movie,attrs)
            var target = to || this
            target.addChild(movie)

            if(attrs.ref){
                this.setRef(attrs.ref,movie)
            }
            return movie
        }
        
        /**
         * 新建一个Shape
         */
        addShape(attrs:v.DisplayUtilsInterface = {},to?:egret.DisplayObjectContainer | egret.Sprite){
            var shape = v.fast.createShape(attrs)
            var target = to || this
            target.addChild(shape)
            if(attrs.ref){
                this.setRef(attrs.ref,shape)
            }
            return shape
        }

        /**
         * [addGroup 在场景新增一个dispalyObject显示对象]
         * @param         attrs [显示对象属性]
         * @param         to    [显示对象父级]
         * @return      [显示对象]
         */
        addGroup(attrs:v.DisplayUtilsInterface = {},to?:egret.DisplayObjectContainer | egret.Sprite):egret.DisplayObjectContainer{
            var container = new egret.DisplayObjectContainer
            v.utils.set(container,attrs)
            var target = to || this
            target.addChild(container)
            if(attrs.ref){
                this.setRef(attrs.ref,container)
            }
            return container
        }
        
        /**
         * [addSprite 在场景中新建一个Sprite显示对象]
         * @param   attrs [显示对象属性]
         * @param   to    [显示对象父级]
         * @return  [增加的sprite实例对象]
         */
        addSprite(attrs:v.DisplayUtilsInterface = {},to?:egret.DisplayObjectContainer | egret.Sprite):egret.DisplayObjectContainer{
            var sprite = new egret.Sprite
            v.utils.set(sprite,attrs)
            var target = to || this
            target.addChild(sprite)
            if(attrs.ref){
                this.setRef(attrs.ref,sprite)
            }
            return sprite
        }
        
        
        /**
         * 事件快速处理器
         */
        
        /**
         * [on 快速绑定]
         * @param {egret.DisplayObject} ele      [需要绑定的元素]
         * @param {string}              type     [事件类型]
         * @param {Function}            listener [监听函数]
         * @return {Function}  [事件解绑]
         */
        on(ele:egret.DisplayObject,type:string,listener:Function){
            ele.addEventListener(type,listener,this,false)
            return ()=>{
                ele.removeEventListener(type,listener,this,false)
            }
        }
        
        /**
         * [off 快速解绑事件]
         * @param {egret.DisplayObject} ele      [绑定元素]
         * @param {string}              type     [事件类型]
         * @param {Function}            listener [监听函数]
         * @return {Function}           [事件重新绑定]
         */
        off(ele:egret.DisplayObject,type:string,listener:Function){
            ele.removeEventListener(type,listener,this,false)
            return ()=>{
                ele.addEventListener(type,listener,this,false)
            }
        }
    }
}