const ENEMY_MOVE_TYPE_FLAG = 0;
const ENEMY_MOVE_TYPE_SIN = 1;
const ENEMY_MOVE_TYPE_COS = 2;
const ENEMY_MOVE_TYPE_TAN = 3;
const ENEMY_MOVE_TYPE_SQUARE = 4; // 矩形波
const ENEMY_MOVE_TYPE_LINEAR = 5; // y = ax + b
const ENEMY_MOVE_TYPE_Z = 6; // z波
const ENEMY_MOVE_TYPE_CIRCLE = 7; // クルリン波
const ENEMY_MOVE_TYPE_EIGHT_CIRCLE = 8; // 八の字波

class Enemy {
    constructor(info) {
        this.img = document.createElement("img");
        this.img.classList.add("enemy");
        this.img.style.position = "absolute";
        this.img.style.left = info.left + "px";
        this.img.style.top = info.top + "px";
        this.img.style.height = info.height + "px";
        this.img.classList.add(info.img_class)
        this.img.src = info.img_src;
        document.getElementById("enemy_container").appendChild(this.img);

        this.index = info.index;
        this.start_time = info.start_time;
        this.move_type = info.move_type;
        this.base_top = info.base_top;
        this.flag = 1;
        this.radius = 50
        this.appearance_elapsed_time = 0;
        this.circle_info = { // 回転移動の時のみ使用する
            top: info.base_top,
            left: info.left,
            theta: 0,
        }
    }
}

Enemy.prototype.timeEvent = function() {
    this.move();
    this.appearance_elapsed_time ++;

    // 敵が左に画面アウトしたかチェック
    if (parseInt(this.img.style.left) <= 0) {
        document.getElementById("enemy_container").removeChild(this.img);
        return false;
    }

    return true;
}

// 敵機の移動
Enemy.prototype.move = function() {
    var left = parseInt(this.img.style.left);

    // 上下移動
    var amount_of_movement_top = 0;
    var amount_of_movement_left = 0;
    var theta = left / 10;

    switch (this.move_type) {
        case ENEMY_MOVE_TYPE_FLAG:
            this.moveFlag();
            break;
        case ENEMY_MOVE_TYPE_SIN:
            this.moveSin();
            break;
        case ENEMY_MOVE_TYPE_COS:
            this.moveCos();
            break;
        case ENEMY_MOVE_TYPE_TAN:
            this.moveTan();
            break;
        case ENEMY_MOVE_TYPE_SQUARE:
            this.moveSquare();
            break;
        case ENEMY_MOVE_TYPE_LINEAR:
            this.moveLinear();
            break;
        case ENEMY_MOVE_TYPE_Z:
            this.moveZ();
            break;
        case ENEMY_MOVE_TYPE_CIRCLE:
            this.moveCircle();
            break;
        case ENEMY_MOVE_TYPE_EIGHT_CIRCLE:
            this.moveEightCircle();
            break;
    }
}

Enemy.prototype.moveFlag = function() {
    var top = parseInt(this.img.style.top);

    if (this.flag == 1 && top > this.radius + this.base_top) {
        this.flag = -1;
    }
    if (this.flag == -1 && top < this.base_top) {
        this.flag = 1;
    }

    amount_of_movement_top = (this.flag * 1) - this.base_top;
    amount_of_movement_left = -1;

    this.img.style.top = (parseInt(this.img.style.top) + amount_of_movement_top + this.base_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveSin = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    amount_of_movement_top = Math.sin(theta) * this.radius;
    amount_of_movement_left = -1;

    this.img.style.top = (amount_of_movement_top + this.base_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveCos = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    amount_of_movement_top = Math.cos(theta) * this.radius;
    amount_of_movement_left = -1;

    this.img.style.top = (amount_of_movement_top + this.base_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveTan = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    amount_of_movement_top = Math.tan(theta) * this.radius;
    amount_of_movement_left = -1;

    this.img.style.top = (amount_of_movement_top + this.base_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveSquare = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    var sin = Math.sin(theta);
    var round = Math.round(sin);

    if (round == 0) {
        // 四捨五入すると5から9のマージンが発生する。
        // *2で調節
        amount_of_movement_top = (sin * this.radius * 2);
    } else if (round < 0) {
        amount_of_movement_top = (round * this.radius);
    } else if (round > 0) {
        amount_of_movement_top = (round * this.radius);
    }

    amount_of_movement_left = (-1 * Math.abs(round));

    this.img.style.top = (amount_of_movement_top + this.base_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveLinear = function() {
    var window_height = parseInt(window.innerHeight);
    var top = parseInt(this.img.style.top);

    if (window_height / 2 < this.base_top) {
        amount_of_movement_top = -1;
    } else {
        amount_of_movement_top = +1;
    }
    amount_of_movement_left = -1;

    this.img.style.top = (parseInt(this.img.style.top) + amount_of_movement_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveZ = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    var sin = Math.sin(theta);
    var round = Math.round(sin);

    amount_of_movement_left = (-1 * Math.abs(round) * 2);
    if (round == 0) {
        // 四捨五入すると5から9のマージンが発生する。
        // *2で調節
        amount_of_movement_top = (sin * this.radius * 2);
        amount_of_movement_left = 1;
    } else if (round < 0) {
        amount_of_movement_top = (round * this.radius);
    } else if (round > 0) {
        amount_of_movement_top = (round * this.radius);
    }

    this.img.style.top = (amount_of_movement_top + this.base_top) + "px";
    this.img.style.left = (parseInt(this.img.style.left) + amount_of_movement_left) + "px";
}

Enemy.prototype.moveCircle = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    var sin = Math.sin(theta);
    var round = Math.round(sin);

    var left = parseInt(this.img.style.left);

    // 矩形波で-1以外は回転
    // 横移動と非横移動はthetaで制御
    // 非横移動はthis.circle_info.thetaで制御の
    // 複合軸
    if (round == -1) {
        this.img.style.top = this.base_top + "px";

        left -= 3;
        this.img.style.left = left + "px";

        this.circle_info = {
            top: this.base_top,
            left: left - this.radius,
        };

        this.circle_info.theta = 270;
    } else {
        if (this.circle_info.theta == 0) {
            this.circle_info.theta = 270;
        } else {
            this.circle_info.theta -= 3.5;
        }

        this.img.style.top = (Math.sin(this.circle_info.theta * Math.PI / 180) * this.radius) + this.radius + this.circle_info.top + "px";
        this.img.style.left = (Math.cos(this.circle_info.theta * Math.PI / 180) * this.radius) + this.radius + this.circle_info.left + "px";
    }
}

Enemy.prototype.moveEightCircle = function() {
    // * 2はスピード調整
    var theta = this.appearance_elapsed_time / this.radius * 2;

    var sin = Math.sin(theta);
    var round = Math.round(sin);

    var left = parseInt(this.img.style.left);

    // 矩形波で-1以外は回転
    // 横移動と非横移動はthetaで制御
    // 非横移動はthis.circle_info.thetaで制御の
    // 複合軸
    if (round == -1) {
        this.img.style.top = this.base_top + "px";

        left -= 3;
        this.img.style.left = left + "px";

        this.circle_info = {
            top: this.base_top - this.radius,
            left: left,
        };

        this.circle_info.theta = 180;
    } else {
        if (this.circle_info.theta == 0) {
            this.circle_info.theta = 180;
        } else {
            this.circle_info.theta -= 7;
        }

        if (this.circle_info.theta <= -184) {
            if (this.circle_info.theta == -184) {
                this.circle_info.left -= (this.radius * 2);
            }
            this.img.style.left = -1 * (Math.cos(this.circle_info.theta * Math.PI / 180) * this.radius) + this.radius + this.circle_info.left + "px";
        } else {
            this.img.style.left = (Math.cos(this.circle_info.theta * Math.PI / 180) * this.radius) + this.radius + this.circle_info.left + "px";
        }

        this.img.style.top = (Math.sin(this.circle_info.theta * Math.PI / 180) * this.radius) + this.radius + this.circle_info.top + "px";
    }
}
