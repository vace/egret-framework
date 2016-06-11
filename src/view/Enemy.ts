module view{
    export class Enemy implements v.PoolInterface{
        static key = 'enemy'
        key = 'enemy'
        constructor(type){
            console.log('enemy type',type)
        }
        onCreate(){
            console.log('enemy create')
        }
        onReset(){
            console.log('enemy reset')
        }
        onDestory(){
            console.log('enemy destory')
        }
    }
}