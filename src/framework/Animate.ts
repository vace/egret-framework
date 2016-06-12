module v{
    export class Animate{
        
        public static get(target:any):Animate{
            return new Animate(target)
        }
        
        private _target:any
        private _loop:number | boolean = 1
        private _duration:number = 0
        private _ease:Function
        private _delay:number = 0
        private _hide:boolean = false
        private _from:Object = {}
        private _before_from:Object = {}
        private _to:Object = {}
        
        constructor(target){
            this._target = target      
        }
        
        
        from(source:Object){
            this._from = source
            var {_before_from,_target} = this
            for(var s in source){
                _before_from[s] = _target[s]
            }
            return this
        }
        
        to(source){
            this._to = source
            return this
        }
        
        delay(wait:number,hide:boolean = false){
            this._delay = wait
            this._hide = hide
            return this 
        }
        
        duration(duration:number){
            this._duration = duration
            return this    
        }
        
        yoyo(){
            this._loop = true
            return this
        }
        
        /**
         * 一个参数 = duration | ease
         * 两个参数 = duration [wait | ease]
         * 三个参数 = duration wait ease 
         */
        play(config:AnimateParamInterface={}):egret.Tween{
            var {_target,_loop,_before_from,_from,_to} = this
            var tweenTo = {}
            
            // 优先取参数配置
            var _duration = typeof config.duration === 'undefined' ? this._duration : config.duration
            var _delay = typeof config.delay === 'undefined' ? this._delay : config.delay
            var _hide = typeof config.hide === 'undefined' ? this._hide : config.hide
            var _ease = typeof config.ease === 'undefined' ? this._ease : config.ease

            
            for(var attr in _from){
                _target[attr] = _from[attr]
            }
            
            var tw = egret.Tween.get(_target,{loop:_loop === true})
            if (_delay > 15){
                tw.wait(_delay)
                // 是否在等待期间隐藏
                if (_hide){
                    _target.visible = false
                    tw.call(()=>_target.visible = true)
                }
            }
            // 动画播放完成后自动释放动画
            return tw.to(_before_from,_duration)
        }
        
        /**
         * 倒序播放动画
         */
        reverse(config:AnimateParamInterface = {}){
            var {_target,_loop,_before_from,_ease,_from,_to} = this
            
            // 优先取参数配置
            var _duration = typeof config.duration === 'undefined' ? this._duration : config.duration
            var _delay = typeof config.delay === 'undefined' ? this._delay : config.delay
            var _hide = typeof config.hide === 'undefined' ? this._hide : config.hide
            var _ease = typeof config.ease === 'undefined' ? this._ease : config.ease
            
            // 设置属性为froms,回滚到默认属性
            for (var attr in _before_from){
                _target[attr] = _before_from[attr]
            }
            return egret.Tween.get(_target).to(_from, _duration,_ease)
        }
    }
}