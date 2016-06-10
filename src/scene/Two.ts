class Two extends v.Scene{
    static key:string = 'two'
    create(){
        console.log('two create')
        
        this.addTextField({
            ref:'texttest',
            y:400,
            size:50,
            width:640,
            textAlign:'center',
            text:'hello text2',
            touchEnabled:true
        }).addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            App.state.state = 'one'
        },this)
    }
    reset(){
        console.log('two reset')
    }
    
    destory(){
        console.log('two destory')
    }
    update(){
        // console.log('update')
    }
}