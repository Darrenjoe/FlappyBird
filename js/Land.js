(function(){
    var Land = window.Land = function(){
        //自己的背景
        this.image = game.R.land;

        this.y = game.canvas.height * 0.78;
        this.x = 0;
        //图片宽度
        this.w = 336;
        
    }
    //更新背景
    Land.prototype.update = function(){
        this.x -= 2;
        if(this.x < -366){
            this.x = 0;
        }
    }
    //渲染
    Land.prototype.render = function(){
        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x + this.w,this.y);
        game.ctx.drawImage(this.image,this.x + this.w * 2,this.y);
        //渲染猫腻
        game.ctx.fillStyle = "#ded895";
        game.ctx.fillRect(0,this.y + 112,game.canvas.width,game.canvas.height * 0.22);
    }
})();