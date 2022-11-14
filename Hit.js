class Hit {
    constructor() {
    }
}

Hit.prototype.ownAndEnemy = function(own, enemies) {
    var own_position = {
        left: parseInt(own.img.style.left),
        top: parseInt(own.img.style.top),
        width: parseInt(own.img.naturalWidth),
        height: parseInt(own.img.naturalHeight)
    }

    for (var i = 0; i < enemies.length; i ++) {
        var enemy_position = {
            left: parseInt(enemies[i].img.style.left),
            top: parseInt(enemies[i].img.style.top),
            width: parseInt(enemies[i].img.naturalWidth),
            height: parseInt(enemies[i].img.naturalHeight),
        }

        if (!this.is(own_position, enemy_position)) {
            continue;
        }

        return true;
    }

    return false;
}

Hit.prototype.bulletAndEnemy = function(enemies) {
    var bullets = document.getElementsByClassName("bullet");

    for (var i = 0; i < enemies.length; i ++) {
        for (var j = 0; j < bullets.length; j ++) {
            var bullet_position = {
                left: parseInt(bullets[j].style.left),
                top: parseInt(bullets[j].style.top),
                width: parseInt(bullets[j].naturalWidth),
                height: parseInt(bullets[j].naturalHeight)
            }
            var enemy_position = {
                left: parseInt(enemies[i].img.style.left),
                top: parseInt(enemies[i].img.style.top),
                width: parseInt(enemies[i].img.naturalWidth),
                height: parseInt(enemies[i].img.naturalHeight),
            }

            if (!this.is(bullet_position, enemy_position)) {
                continue;
            }

            // ヒットしている
            document.body.removeChild(bullets[j]);

            return i;
        }
    }

    return -1;
}

// 当たり判定
/**
 *  position1 and position2 = {
 *      left: parseInt(img.style.left),
 *      top: parseInt(img.style.top),
 *      width: parseInt(img.naturalWidth),
 *      height: parseInt(img.naturalHeight)
 *  }
 */
Hit.prototype.is = function(position1, position2) {
    // 横位置が被っていないか？
    if (
        position1.left > position2.left + position2.width
        || position1.left + position1.width < position2.left
    ) {
        return false;
    }

    // 縦位置が被っていないか？
    if (
        position1.top > position2.top + position2.height
        || position1.top + position1.height < position2.top
    ) {
        return false;
    }

    return true;
}
