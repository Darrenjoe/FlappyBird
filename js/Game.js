(function(){
    var Game = window.Game = function(params){
        //得到画布
        this.canvas = document.querySelector(params.id);
        //上下文
        this.ctx = this.canvas.getContext("2d");
        //资源文件地址
        this.Rjsonurl = params.Rjsonurl;
        //帧编号
        this.fno = 0;
        //设置画布高度和宽度
        this.init();
        //分数
        this.score = 0;
        //读取资源
        var self = this;
        this.loadAllResource(function(){
            //封装回调函数，全部资源读取完毕
            self.start();
            // self.bindEvent();
        });
    }
    //初始化，设置画布的宽度和高度
    Game.prototype.init = function(){
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if(windowW > 414){
            windowW = 414;
        }else if(windowW < 320){
            windowW = 320;
        }
        if(windowH > 736){
            windowH = 736;
        }else if(windowH > 500){
            windowH = 500;
        }
        //让canvas匹配视口
        this.canvas.width = windowW;
        this.canvas.height = windowH
    }
    //读取资源
    Game.prototype.loadAllResource = function(callback){
        //准备一个对象
        this.R = {};
        var self = this; //备份
        //计数器
        var allredyDoneNumber = 0;
        //发送请求，请求JSON
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var Robj = JSON.parse(xhr.responseText);
                //遍历数组
                for(var i = 0 ; i < Robj.images.length ; i++){
                    //创建一个同名的key
                    self.R[Robj.images[i].name] = new Image();
                    //请求
                    self.R[Robj.images[i].name].src = Robj.images[i].url;
                    //监听
                    self.R[Robj.images[i].name].onload = function(){
                        allredyDoneNumber++;
                        //清屏
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        //提示文字
                        var txt = "正在加载" + allredyDoneNumber + "/" + Robj.images.length + "请稍后";
                        //将字幕居中，黄金分割点
                        self.ctx.textAlign = "center";
                        self.ctx.font = "20px 微软雅黑";
                        self.ctx.fillText(txt, self.canvas.width / 2, self.canvas.height * (1-0.618));
                        //判断是否已经全部加载完毕
                        if(allredyDoneNumber == Robj.images.length){
                            callback();
                        }
                    }
                };
            }
        }
        xhr.open("get",this.Rjsonurl,true);
        xhr.send(null);
    }
    //开始游戏
    Game.prototype.start = function(){
        // //实例化背景
        // this.background = new Background();
        // //实例化大地
        // this.land = new Land();

        // //管子数组
        // this.pipeArr = [];
        
        // //实例化小鸟
        // this.bird = new Bird();

        //实例化自己的场景管理器
        this.sm = new ScneneManager();

        var self = this;
        //设置定时器
        this.timer = setInterval(function(){
            //清屏
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            //帧编号
            self.fno++;
            //场景管理器的渲染和更新
            self.sm.update();
            self.sm.render();

        //     //更新背景
        //     self.background.update();
        //     //渲染背景
        //     self.background.render();

        //     //更新大地
        //     self.land.update();
        //     //渲染大地
        //     self.land.render();

        //     //更新所有的管子
        //     for(var i = 0; i < self.pipeArr.length; i++){
        //         self.pipeArr[i] && self.pipeArr[i].update();
        //         //验证管子是否还在数组中
        //         self.pipeArr[i] && self.pipeArr[i].render();
        //     }
        //     //每一定帧数实例化管子
        //     self.fno % 120 == 0 && (new Pipe());

        //    //更新小鸟
        //    self.bird.update();
        //    //渲染小鸟
        //    self.bird.render();
            //打印帧编号
            self.ctx.font = "16px consolas";
            self.ctx.textAlign = "left";
            self.ctx.fillText("FNO:" + self.fno , 10 ,13);
            self.ctx.fillText("场景号:" + self.sm.sceneNumber , 10 ,30);
        },20);
    }
    // Game.prototype.bindEvent = function(){
    //     var self = this;
    //     this.canvas.onclick = function(){
    //         self.bird.fly();
    //     }
    // }
})();