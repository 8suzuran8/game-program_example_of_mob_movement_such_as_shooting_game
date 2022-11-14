class EnemyFactory {
    constructor(enemy_list) {
        this.enemy_list = enemy_list;
    }
}

// createEnemyの呼び出し
EnemyFactory.prototype.callCreateEnemy = function(time, index, enemy_info) {
    if (enemy_info.time == time) {
        return this.createEnemy(index);
    }

    return false;
}

// 敵機の出現
/**
 * type == 0 ? mosquito
 * type == 1 ? BombyxMori
 */
EnemyFactory.prototype.createEnemy = function (index) {
    var left_max = parseInt(window.innerWidth);
    var top_max = parseInt(window.innerHeight);

    var height = 10;

    // img_type == 0 ? mosquito
    var img_src = "", img_class = "";
    switch (this.enemy_list[index].img_type) {
        case 0:
            img_class = "mosquito";
            img_src = "mosquito.svg";
            height = 20;
            break;
        case 1:
            img_class = "bombyx_mori";
            img_src = "BombyxMori.svg";
            height = 50;
            break;
    }

    return {
        left: (left_max - 50),
        top: (this.enemy_list[index].base_top),
        height: height,
        img_class: img_class,
        img_src: img_src,
        index: index,
        move_type: this.enemy_list[index].move_type,
        base_top: this.enemy_list[index].base_top,
    }
}
