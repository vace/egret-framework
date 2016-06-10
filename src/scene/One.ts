

class One extends v.Scene{
    static key:string = 'one'
    
    create(){
        console.log('create')
        
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
    }
    reset(){
        var text = <egret.TextField>this.getRef('textfiled')
        text.text = 'no time is ' + egret.getTimer()
        // text.text = '111'
        
        console.log('reset')
    }
    update(){
        // console.log('update')
    }
    destory(){
        console.log('one destory')
    }
    
}