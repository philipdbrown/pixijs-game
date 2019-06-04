/**
 * Player class
 */
class Player {
    constructor(data) {
        this.isHitting = false;
        this.shooting = {
            isShooting: false,
            delay: 10
        }

        this.lifes = 3;
        this.score = 0;

        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.scale = data.scale;

        this.vx = 0;
        this.vy = 0;

        this.texture = Game.assets["assets/images/player.png"].texture;

        this.sprite = new Game.Sprite(this.texture);

        this.sprite.position.set(this.x, this.y);
        this.sprite.scale.set(this.scale, this.scale);

        this.key = {
            up : new Keyboard(38),
            down : new Keyboard(40),
            left : new Keyboard(37),
            right : new Keyboard(39),
            space : new Keyboard(32)
        };

        this.setMovement();

        Game.stage.container.addChild(this.sprite);
    }

    hit() {
        if (!this.isHitting) {
            this.isHitting = true;
            this.lifes--;

            if (this.lifes < 1) {
               Game.gameStatus = 2;
           }

            this.sprite.texture = Game.assets["assets/images/player_hit.png"].texture;

            setTimeout(() => {
                this.sprite.texture = Game.assets["assets/images/player.png"].texture;
                this.isHitting = false;
            }, 500)
        }
    }

    move() {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
   }

    setMovement() {
        //TODO: fluidify
        let _this = this;

        //Movements
        this.key.up.press = function() {
            _this.vy = -_this.speed;
        }
        this.key.up.release = function() {
            _this.vy = 0;
        }

        this.key.down.press = function() {
            _this.vy = _this.speed;
        }
        this.key.down.release = function() {
            _this.vy = 0;
        }

        this.key.left.press = function() {
            _this.vx = -_this.speed;
        }
        this.key.left.release = function() {
            _this.vx = 0;
        }

        this.key.right.press = function() {
            _this.vx = _this.speed;
        }
        this.key.right.release = function() {
            _this.vx = 0;
        }

        //Fire
        this.key.space.press = function() {
            _this.shooting.isShooting = true;
            _this.shoot();
        }
        this.key.space.release = function() {
            _this.shooting.isShooting = false;
        }
    }

    shoot() {
        let bullet = new Bullet({
           x : this.sprite.x,
           y : this.sprite.y+10,
           speed : 20,
           scale : 0.8
       });

       Game.bullets.push(bullet);
    }

    update() {
        if (this.shooting.isShooting && Game.tick % this.shooting.delay == 1) {
            this.shoot();
        }
    }

}