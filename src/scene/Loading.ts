

/**
 * 多谷数据通用Loading
 */

class Loading extends v.LoadingBase{
    public static key = 'loading'
    
    create(){
        // 单词 digger
        var wordsGroup = this.addGroup({ref:'words'})
        var words = ['d','i','g','g2','er','dot']
        words.forEach(word=>wordsGroup.addChild(v.fast.createBitmap(`logo-${word}`)))
        
        // 汉字 logo
        this.addBitmap('logo-diggid',{x:170,y:84,ref:'logo_text'})
        
        this.addMovieClip({
            data:'loading_anim_json',
            texture:'loading_anim_png',
            animate:'diggloading'
        }).play(-1)
    }
    
    onProgress(current,total){
        
    }
    
}