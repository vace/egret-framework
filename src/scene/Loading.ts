

/**
 * 多谷数据通用Loading
 */

class Loading extends v.LoadingBase{
    public static key = 'loading'
    
    create(){
        // 单词 digger
        var wordsGroup = this.addGroup({ref:'words',y:400})
        var words = ['d','i','g','g2','er','dot']
        words.forEach(word=>wordsGroup.addChild(v.fast.createBitmap(`logo-${word}`)))
        
        // 汉字 logo
        var text = v.fast.createBitmap('logo-diggid',{x:170,y:84})
        wordsGroup.addChild(text)
        
        // 进度条 movieclip
        this.addMovieClip({ref:'progress_clip',data:'loading_anim_json',texture:'loading_anim_png',animate:'diggloading',y:356})
        
        // 加载条 movieclip
        this.addMovieClip(
            {ref:'bground_clip',data:'loading_anim_json',texture:'loading_anim_png',animate:'diggbackground',visible:false},
            wordsGroup
        )
        
        // 进度条 shape
        this.addShape({ref:'progress_bar',y:430})
        
        // 设置wordgroup的缩放比例
        App.utils.setAttrs(wordsGroup,
            {anchorOffsetX:wordsGroup.width / 2,anchorOffsetY:wordsGroup.height / 2,x:this.stageWidth / 2,y:360,scaleX:0.4,scaleY:0.4}
        )
        
        // 文字
        this.addTextField({
            text:'loading... [ 0% ]',ref:'text_loading',
            width:this.stageWidth,textAlign:'center',y:440,size:10,textColor:0xffffff
        })

    }
    
    update(){

    }
    
    reset(){
        var group = this.getRef<egret.DisplayObjectContainer>('words')
        
        // 播放入场动画
        var movieClip = this.getRef<egret.MovieClip>('progress_clip')
        movieClip.x = 0
        movieClip.play(-1)
        
        // 播放文字入场动画
    }
    
    destory(){
        // 停止movie clip
        this.getRef<egret.MovieClip>('progress_clip').stop()
    }
    
    onProgress(current,total){
        var gh = this.getRef<egret.Shape>('progress_bar').graphics,
            {stageWidth,stageHeight} = this,
            width = 360,height = 6
        var startX = (stageWidth - width) / 2
        var startY = 0
        var progress = current / total
        gh.clear()
        gh.beginFill(0xffffff)
        gh.drawRoundRect(startX,startY,width,height,height / 2,height / 2)
        gh.endFill()
        
        var pwidth = progress * width
        gh.beginFill(0xd2ff00)
        gh.drawRoundRect(startX,startY,pwidth,height,height / 2,height / 2)
        gh.endFill()
        
        
        this.getRef<egret.MovieClip>('progress_clip').x = progress * 400
        
        this.getRef<egret.TextField>('text_loading').text = `loading... [ ${(progress * 100).toFixed(2)}% ]`
        
    }
    
}