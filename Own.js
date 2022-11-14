class Own {
    static max_bullet = 5;

    constructor() {
        this.speed = [
            0,
            0,
        ];

        // キー入力時の処理
        var self = this;

        document.addEventListener("keydown", function(event) {
            if (event.ctrlKey) {
                if (event.key == "p") {
                    // 上
                    if (self.speed[1] > -3) {
                        self.speed[1] -= 3;
                    }
                } else if (event.key == "n") {
                    // 下
                    if (self.speed[1] < 3) {
                        self.speed[1] += 3;
                    }
                } else if (event.key == "b") {
                    // 左
                    if (self.speed[0] > -3) {
                        self.speed[0] -= 3;
                    }
                } else if (event.key == "f") {
                    // 右
                    if (self.speed[0] < 3) {
                        self.speed[0] += 3;
                    }
                } else if (event.key == " ") {
                    self.shoot();
                }
            }
        }, false)

        document.addEventListener("keyup", function(event) {
            self.speed = [
                0,
                0,
            ]
        })

        this.img = document.getElementById("own");
        this.img.style.left = "0px";
        this.img.style.top = (window.innerHeight / 2) + "px";
    }
}

Own.prototype.timeEvent = function() {
    this.move();
    this.bulletMove();
}

// 自機の移動
Own.prototype.move = function() {
    var own = document.getElementById("own");

    var left = parseInt(own.style.left) + this.speed[0];
    var top = parseInt(own.style.top) + this.speed[1];

    if (left < 0) {
        left = 0;
        this.speed[0] = 0;
    }
    if (top < 0) {
        top = 0;
        this.speed[1] = 0;
    }
    var left_max = parseInt(window.innerWidth) - 100;
    if (left > left_max) {
        left = left_max;
        this.speed[0] = 0;
    }
    var top_max = parseInt(window.innerHeight) - 50;
    if (top > top_max) {
        top = top_max;
        this.speed[1] = 0;
    }

    own.style.left = left + "px";
    own.style.top = top + "px";
}

// 玉の移動
Own.prototype.bulletMove = function() {
    var bullets = document.getElementsByClassName("bullet");
    var left_max = parseInt(window.innerWidth);

    for (var i = 0; i < bullets.length; i ++) {
        var left = parseInt(bullets[i].style.left);

        // 玉の移動
        bullets[i].style.left = (left + 3) + "px";

        // 玉が右に画面アウトしたかチェック
        if (left > left_max) {
            document.body.removeChild(bullets[i]);
        }
    }
}

// 打つ
Own.prototype.shoot = function() {
    var bullets = document.getElementsByClassName("bullet");
    if (bullets.length > Own.max_bullet) return;

    var own = document.getElementById("own");

    var bullet = document.createElement("img");
    bullet.className = "bullet";
    bullet.src = "bullet.svg";
    bullet.style.position = "absolute";
    bullet.style.width = "5px";
    bullet.style.height = "5px";
    bullet.style.left = (parseInt(own.style.left) + 100) + "px";
    bullet.style.top = (parseInt(own.style.top) + 25) + "px";
    document.body.appendChild(bullet);
}
