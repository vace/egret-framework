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
        static createBitmap(resName:string,scale9Grid:boolean=false):egret.Bitmap{
            var texture = RES.getRes(resName)
            var bitmap = new egret.Bitmap
            bitmap.texture = texture
            if(scale9Grid){
                bitmap.scale9Grid = texture.scale9Grid
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
        
        /**
         * 根据dataRes和textureName生成指定animate动画
         */
        static createMovieClip(dataResName:string,textureResName:string,animateName:string):egret.MovieClip{
            var cacheKey = `d:${dataResName}t:${textureResName}`
            if(!_movieClipDataCache[cacheKey]){
                 var data = RES.getRes(dataResName)
                var texture = RES.getRes(textureResName)
                var movieFactory = new egret.MovieClipDataFactory(data,texture)
                _movieClipDataCache[cacheKey] = movieFactory
            }
            var mcData = _movieClipDataCache[cacheKey].generateMovieClipData(animateName)
            var mc:egret.MovieClip = new egret.MovieClip(mcData)
            return mc
        }
    }
}