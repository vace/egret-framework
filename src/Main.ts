class Main extends egret.DisplayObject{

    constructor(){
        super()
        App.state.register(Loading,One,Two)
        // App.state.state = 'one'
        // App.res.setConfig({
        //     scene:'test'
        // })
        App.res.preload('preload').loading('loading').state('one').start()
    }
    
}