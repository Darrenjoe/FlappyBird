(function(){
    var Bird = window.Bird = function(){
        //随机小鸟颜色
        this.color = parseInt(Math.random() * 3);
        //决定用图
        this.imageArr = [
            game.R["bird" + this.color + "_0"],
            game.R["bird" + this.color + "_1"],
            game.R["bird" + this.color + "_2"]
        ];
        //翅膀状态
        this.wingStep = 0;
        //小鸟的初始位置
        //图片48
        this.x = game.canvas.width * (1 - 0.618) - 24;
        this.y = 100;
        //鸟的帧数,用于下落和上升算法
        this.fno = 0;
        //角度
        this.d = 0;
        //是否拥有能量
        this.hasEnergy = false;

    }
    Bird.prototype.update = function(){
        this.wingFly();
        //掉落算法
        if(!this.hasEnergy){
            this.y += this.fno * 0.51;
        }else{
            this.y -= (16 - this.fno) * 0.51;
            if(this.fno > 20){
                this.hasEnergy = false;
                this.fno = 0;
            }
        }
        this.d += 0.04;
        this.fno++;
        //验收天空
        if(this.y < 0){
            this.y = 0;

        }
        //计算自己的四个碰撞检测值
        this.T = this.y - 12;
        this.R = this.x + 17;
        this.B = this.y + 12;
        this.L = this.x - 17;

        //验证是否落地
        if(this.B > game.canvas.height * 0.78){
           //gameover进入场景4
           game.sm.enter(4);
        }
    }
    Bird.prototype.render = function(){
        game.ctx.save();
        game.ctx.translate(this.x , this.y);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24);
        game.ctx.restore();
    }
    Bird.prototype.fly = function(){
        this.hasEnergy = true;
        this.d = -0.6;
        this.fno = 0;
    }
    //翅膀状态
    Bird.prototype.wingFly =function(){
        game.fno % 3 == 0 && this.wingStep++;
        if(this.wingStep > 2){
            this.wingStep = 0;
        }
    }
})();