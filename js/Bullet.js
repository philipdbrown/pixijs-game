/**
 * Bullet Class
 */
class Bullet {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.scale = data.scale;

        this.vx = this.speed;
        this.texture = Game.assets['assets/images/bullet.png'].texture;
        this.sprite = new Game.Sprite(this.texture);
        this.sprite.position.set(this.x, this.y);
        this.sprite.scale.set(this.scale, this.scale);
        Game.layers.bullets.addChild(this.sprite);
    }

    destroy() {
        Game.layers.bullets.removeChild(this.sprite);
        let index = Game.bullets.indexOf(this);
        Game.bullets.splice(index, 1);
    }

    move() {
        this.sprite.x += this.vx;
    }

    update() {
        if(this.sprite.x > Game.stage.width) {
            this.destroy();
        }

        for(let i in Game.enemies) {
            if(Collision.box(this.sprite, Game.enemies[i].container) && !Game.enemies[i].isAnimating) {
                Game.player.score++;
                Game.enemies[i].explode();
                this.destroy();
            }
        }
    }
}