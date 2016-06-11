module v{
    /**
     * 动画工厂缓存方法
     */
    var _movieClipDataCache = {}
    /**
     * 快速构建工具
     */
    export class fast{
        /**
         * 快速从资源中创建bitmap
         */
        static createBitmap(resName:string,attrs?:v.DisplayUtilsInterface):egret.Bitmap{
            var texture = RES.getRes(resName)
            
            if (!texture){
                App.warn(`bitmap:${resName} is not found in resourse`)
            }
            
            var bitmap = new egret.Bitmap
            bitmap.texture = texture
            if(texture.scale9Grid){
                bitmap.scale9Grid = texture.scale9Grid
            }
            
            if (attrs){
                utils.set(bitmap,attrs)
            }
            return bitmap
        }
        
        static createTextField(attrs?:v.TextFieldUtilsInterface):egret.TextField{
            var text = new egret.TextField
            return v.utils.set(text,attrs)
        }
        
        static createShape(attrs?:v.DisplayUtilsInterface):egret.Shape{
            var shape = new egret.Shape
            return v.utils.set(shape,attrs)
        }
        
        static createBitmapText(fntName:string,attrs?:v.TextFieldUtilsInterface):egret.BitmapText{
            var bitmaptext = new egret.BitmapText
            var font = RES.getRes(fntName)
            if (!font){
                App.warn(`fnt:${fntName} is not found in resourse`)
            }
            bitmaptext.font = font
            return utils.set(bitmaptext,attrs)
        }
        
        /**
         * 根据dataRes和textureName生成指定animate动画
         */
        static createMovieClip(dataResName:string,textureResName:string,animateName:string):egret.MovieClip{
            var cacheKey = `d:${dataResName}t:${textureResName}`
            if(!_movieClipDataCache[cacheKey]){
                var data = RES.getRes(dataResName)
                var texture = RES.getRes(textureResName)
                if (!texture || !data){
                    App.warn(`movieClip:${dataResName} or ${textureResName} is not found in resourse`)
                }
                var movieFactory = new egret.MovieClipDataFactory(data,texture)
                _movieClipDataCache[cacheKey] = movieFactory
            }
            var mcData = _movieClipDataCache[cacheKey].generateMovieClipData(animateName)
            var mc:egret.MovieClip = new egret.MovieClip(mcData)
            return mc
        }
    }
}