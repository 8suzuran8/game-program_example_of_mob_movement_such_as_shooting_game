class ShootingGame {
    static enemy_list = [
        {
            time: 1,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_EIGHT_CIRCLE,
            base_top: 100,
        },
        {
            time: 1.5,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_EIGHT_CIRCLE,
            base_top: 100,
        },
        {
            time: 2,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_EIGHT_CIRCLE,
            base_top: 100,
        },
        {
            time: 2.5,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_EIGHT_CIRCLE,
            base_top: 100,
        },
        {
            time: 3,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_EIGHT_CIRCLE,
            base_top: 100,
        },

        {
            time: 1,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_SIN,
            base_top: 250,
        },
        {
            time: 1.5,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_SIN,
            base_top: 250,
        },
        {
            time: 2,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_SIN,
            base_top: 250,
        },
        {
            time: 2.5,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_SIN,
            base_top: 250,
        },
        {
            time: 3,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_SIN,
            base_top: 250,
        },

        {
            time: 1,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_CIRCLE,
            base_top: 400,
        },
        {
            time: 1.5,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_CIRCLE,
            base_top: 400,
        },
        {
            time: 2,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_CIRCLE,
            base_top: 400,
        },
        {
            time: 2.5,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_CIRCLE,
            base_top: 400,
        },
        {
            time: 3,
            img_type: 0,
            move_type: ENEMY_MOVE_TYPE_CIRCLE,
            base_top: 400,
        },
    ];

    constructor() {
        this.time = 0;
        this.score = 0;

        var date = new Date();
        this.start_time = date.getTime();

        this.own = new Own();
        this.enemy_factory = new EnemyFactory(ShootingGame.enemy_list);
        this.enemies = [];

        this.hit = new Hit();

        var self = this;
        this.time_interval = setInterval(function() {
            // 時間の更新
            self.time += 0.5;
            document.getElementById("time").innerText = "TIME " + self.time;

            // 敵機の出現
            for (var i = 0; i < ShootingGame.enemy_list.length; i ++) {
                var enemy_result = self.enemy_factory.callCreateEnemy(self.time, i, ShootingGame.enemy_list[i]);
                if (enemy_result) {
                    enemy_result.start_time = self.time
                    self.enemies.push(new Enemy(enemy_result))
                }
            }
        }, 500);
        this.time_interval = setInterval(function() {
            // 自機と敵機の衝突判定
            if (self.hit.ownAndEnemy(self.own, self.enemies)) {
                alert("game over");
                return location.reload();
            }

            // 玉と敵機の衝突判定
            var result = self.hit.bulletAndEnemy(self.enemies);
            if (result >= 0) {
                self.score += 10;
                document.getElementById("score").innerText = "SCORE " + self.score;

                document.getElementById("enemy_container").removeChild(self.enemies[result].img);
                self.enemies[result].destroy;
                self.enemies.splice(result, 1);
            }

            // 自機と玉の移動
            self.own.timeEvent();

            for (var i = 0; i < self.enemies.length; i ++) {
                // 敵機の移動
                var result = self.enemies[i].timeEvent()

                // 敵が左に画面アウトしたかチェック
                if (result == false) {
                    self.enemies[i].destroy;
                    self.enemies.splice(i, 1);
                }
            }
        }, 1000 / 60);
    }
}
