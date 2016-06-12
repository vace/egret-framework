

class One extends v.Scene{
    static key:string = 'one'
    
    create(){
        console.log('create')
        
        var ememy = App.pool.produce(view.Enemy,'enemy type')
        
        App.pool.recycle(ememy)
        
        this.addTextField({
            ref:'textfiled',
            text:'hehe',
            y:300,
            textAlign:'center',
            width:640,
            touchEnabled:true
        }).addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            App.state.state = 'two'
        },this)       
        
        this.addBitmapText('fonttest_fnt',{text:'hello 大家好,我是按钮',x:100,y:500})
        
        // 增加一个运行动画
        this.setAniRef('textfiled').duration(1000).from({scaleX:2,scaleY:2,alpha:2})
    }
    reset(){
        var text = <egret.TextField>this.getRef('textfiled')
        text.text = 'no time is ' + egret.getTimer()
        
        this.getAni('textfiled').play()
        console.log('reset')
    }
    update(){
        // console.log('update')
    }
    destory(){
        console.log('one destory')
    }
    
}