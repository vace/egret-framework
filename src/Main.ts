class Main extends egret.DisplayObject{

    constructor(){
        super()
        App.state.register(Loading,One,Two)
        App.res.preload('preload').loading('loading').state('one').start()
    }
    
}