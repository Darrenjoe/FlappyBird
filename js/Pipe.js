(function(){
    var Pipe = window.Pipe = function(){
        //自己的背景
        this.imageup = game.R.pipe_up;
        this.imagedown = game.R.pipe_down;

        this.allHeight = game.canvas.height * 0.78;
        this.interspace = 120;
        //图片高度
        this.picheheight = 320;
        //随机管子高度，保证管子最少有100的高度
        this.height1 =120 + parseInt(Math.random() * (this.picheheight - 120));
        //下管高度
        this.height2 = this.allHeight - this.interspace - this.height1;
        //自己的位置
        this.x = game.canvas.width;
        //判断该管子是否已经加过分了
        this.alredyPass = false;
        //将自己推入管子
        game.pipeArr.push(this);
    }
    //更新背景
    Pipe.prototype.update = function(){
        this.x -= 2;
        //碰撞检测
        if(game.bird.R > this.x && game.bird.L < this.x + 52){
            if(game.bird.T <this.height1 || game.bird.B > this.height1 + this.interspace){
                //gameover进入场景4
                game.sm.enter(4);
            }
        }
        //加分
        if(game.bird.R > this.x + 52 && !this.alredyPass){
            game.score++;
            //标记为已通过
            this.alredyPass = true;
        }

        //检测管子是否出了视口。true => 删除数组中的该管子
        if(this.x < -52){
            for(var i = 0 ; i < game.pipeArr.length; i++){
                if(game.pipeArr[i] === this){
                    game.pipeArr.splice(i,1);
                }
            }
        }
    }
    //渲染
    Pipe.prototype.render = function(){
        game.ctx.drawImage(this.imagedown,0,this.picheheight - this.height1,52,this.height1,this.x,0,52,this.height1);
        game.ctx.drawImage(this.imageup,0,0,52,this.height2,this.x,this.height1 + this.interspace,52,this.height2);
    }
})();