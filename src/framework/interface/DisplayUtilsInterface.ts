module v{
    export interface DisplayUtilsInterface{
        // 设置ref属性,可以使用ref快速引用
        ref?:string,
        alpha?:number,
        x?:number,
        y?:number,
        width?:number,
        height?:number,
        mask?:egret.DisplayObject | egret.Rectangle,
        visible?:boolean,
        blendMode?:string,
        scaleX?:number,
        scaleY?:number,
        skewX?:number,//弧度 radian
        skewY?:number,
        rotation?:number,
        name?:string,
        matrix?:egret.Matrix,
        bounds?:string,
        cacheAsBitmap?:boolean,
        anchorOffsetX?:number,
        anchorOffsetY?:number,
        filters?:egret.Filter[],
        touchEnabled?:boolean,
        scrollRect?:egret.Rectangle
    }
    
    export interface TextFieldUtilsInterface extends DisplayUtilsInterface{
       background?:boolean,
       backgroundColor?:number,
       bold?:boolean,
       border?:boolean,
       borderColor?:number,
       displayAsPassword?:boolean,
       fontFamily?:string,
       inputType?:string,
       italic?:boolean,
       lineSpacing?:number,
       maxChars?:number,
       multiline?:boolean,
       size?:number,
       restrict?:string,
       stroke?:number,
       strokeColor?:number,
       text?:string,
       textAlign?:string,
       textColor?:number,
       type?:string,
       verticalAlign?:string,
       wordWrap?:boolean,
       textFlow?:egret.ITextElement[]
    }
    
    export interface MoiveClipUtilInterface extends DisplayUtilsInterface{
        frameRate?:number,
        movieClipData?:egret.MovieClipData,
        smoothing?:boolean
    }
    
    export interface SceneRefInterface{
        [key:string]:any
    }
}