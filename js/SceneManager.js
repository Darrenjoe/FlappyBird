(function(){
    var ScneneManager = window.ScneneManager = function(){
        // 1 => 欢迎界面 2 => 游戏界面 3 => GameOver
        this.sceneNumber = 1;
        //场景管理器负责实例化
        game.bg = new Background();
        game.land = new Land();
        game.bird = new Bird();

        this.logoY = -48;
        //button_play的y值
        this.button_playX = game.canvas.width / 2 - 58;
        this.button_playY = game.canvas.height;
        //添加监听
        this.bindEvent();
    }
    ScneneManager.prototype.update = function(){
        switch(this.sceneNumber){
            case 1 :
                //让logo进行移动
                this.logoY += 5;
                if(this.logoY > 120){
                    this.logoY = 120;
                }
                //让按钮移动
                this.button_playY -= 13;
                if(this.button_playY < 280){
                    this.button_playY = 280;
                }
                break;
            case 2 :
                game.bird.wingFly();
                //改变透明度
                this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.1 : 0.1;
                if(this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9){
                    this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown;
                }
                break;
            case 3 :
                game.bg.update();
                game.land.update();
                game.bird.update();
                
                //每一定帧数实例化管子
                game.fno % 120 == 0 && (new Pipe());
                //管子更新
                for(var i = 0; i < game.pipeArr.length; i++){
                    game.pipeArr[i] && game.pipeArr[i].update();
                }
                break;
            case 4 :
                if(game.bird.y > game.canvas.height * 0.78 - 24){
                    this.isBirdLand = true;
                }
                this.birdfno++;
                if(!this.isBirdLand){
                    game.bird.y += 1.4 * this.birdfno;
                }else{
                    game.fno % 4 == 0 && this.boomStep ++;
                    if(this.boomStep > 12){
                        this.boomStep = 12;
                    }
                }
            
                //白屏拉回
                game.ctx.globalAlpha += 0.1;
                if(game.ctx.globalAlpha > 1){
                    game.ctx.globalAlpha = 1;
                }
        }
    }
    ScneneManager.prototype.render = function(){
        // 根据当前是第几个场景，决定做什么
        switch(this.sceneNumber){
            case 1 : 
                game.bg.render();
                game.land.render();
                //渲染小鸟
                game.bird.render();
                game.bird.x = game.canvas.width / 2;
                game.bird.y = game.canvas.height / 2 - 140;
                //画logo
                game.ctx.drawImage(game.R["title"],game.canvas.width / 2 - 89,this.logoY);
                //画按钮
                game.ctx.drawImage(game.R["button_play"],this.button_playX,this.button_playY);
                break;
            case 2 :
                game.bg.render();
                game.land.render();
                game.bird.render();
                //画教程
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity; //透明度
                game.ctx.drawImage(game.R["tutorial"],game.canvas.width / 2 - 57,200);
                game.ctx.restore();
                break;
            case 3 :
                game.bg.render();
                game.land.render();
                game.bird.render();
                for(var i = 0; i < game.pipeArr.length; i++){
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                 //打印分数
                var scoreLength = game.score.toString().length; //分数的位数
                for(var i = 0 ; i < scoreLength;i++){
                    game.ctx.drawImage(game.R["score" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                }
                break;
            case 4 :
                game.bg.render();
                game.land.render();
                if(!this.isBirdLand){
                    game.bird.render();
                }else{
                    //渲染爆炸特效
                    if(this.boomStep <= 11){
                        game.ctx.drawImage(game.R["a" + this.boomStep],game.bird.x - 100 , game.bird.y - 100,200,200);  
                    }else{
                        this.enter(5);
                    }
                }
                for(var i = 0; i < game.pipeArr.length; i++){
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印分数
                var scoreLength = game.score.toString().length; //分数的位数
                for(var i = 0 ; i < scoreLength;i++){
                    game.ctx.drawImage(game.R["score" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                }
                break;
            case 5 :
                game.bg.render();
                game.land.render();
                //渲染管子
                for(var i = 0; i < game.pipeArr.length; i++){
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                // //打印分数
                var scoreLength = game.score.toString().length; //分数的位数
                for(var i = 0 ; i < scoreLength;i++){
                    game.ctx.drawImage(game.R["score" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
                }

                //渲染重新再来
                game.ctx.drawImage(game.R["text_game_over"],game.canvas.width / 2 - 102,game.canvas.height * 0.3);
                break;
        }
    }
    ScneneManager.prototype.enter = function(number){
        this.sceneNumber = number;
        switch(this.sceneNumber){
            case 1 :
                //进入1号场景
                game.bird.d = 0;
                game.score = 0;
                this.logoY = -48;
                this.button_playY = game.canvas.height;
                break;
            case 2 :
                game.bird.y = 150;
                //tutorial的透明度是0~1
                this.tutorialOpacity = 1;
                this.tutorialOpacityIsDown = true;
            case 3 :
                //管子数组
                game.pipeArr = new Array();
                break;
            case 4 :
                //死亡动画
                game.ctx.globalAlpha = 0;
                //小鸟是否已经触底
                this.isBirdLand = false;
                //小帧编号
                this.birdfno = 0;
                //爆炸动画
                this.boomStep = 0;
                break;
        }
    }
    ScneneManager.prototype.bindEvent = function(number){
        var self = this;
        game.canvas.onclick = function(event){
            var mousex = event.clientX;
            var mousey = event.clientY;
            switch(self.sceneNumber){
                case 1 :
                    //进入1号场景
                    if(mousex > self.button_playX && mousex < self.button_playX + 116 && mousey > self.button_playY && mousey < self.button_playY + 70){
                        //用户点击到了按钮
                        self.enter(2); //去往2号场景
                    }
                    break;
                case 2 :
                    self.enter(3);
                    break;
                case 3 :
                    game.bird.fly();
                    break;
                case 5 :
                    self.enter(1);
                    break;
            }
        }
    }
})()