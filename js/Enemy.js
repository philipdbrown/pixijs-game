/**
 * Class Enemy
 */
class Enemy {
    constructor(data) {
        this.isAnimating = false;

        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.scale = data.scale;

        this.vx = this.speed;

        this.container = new Game.Container();
        this.container.position.set(this.x, this.y);
        this.container.scale.set(this.scale, this.scale);

        let texture = Game.assets[`${Game.assetsDir}enemy.png`].texture;
        this.sprite = new Game.Sprite(texture);
        this.container.addChild(this.sprite);

        /**
         * What are Textures?
         */
        let explosionTextures = [];

        // for (let i in Game.assets["assets/images/explode.json"].textures) {
        //     explosionTextures.push(Game.assets["assets/images/explode.json"].textures[i]);
        // }

        // this.explosion = new Game.MovieClip(explosionTextures);
        // this.explosion.visible = false;
        // this.explosion.animationSpeed = 0.4;
        // this.explosion.anchor.set(0.5, 0.5);
        // this.explosion.loop = false;
        // this.explosion.rotation = Math.random() * Math.PI;
        // this.explosion.scale.x = this.explosion.scale.y = 0.5 + Math.random();

        // this.container.addChild(this.explosion);

        Game.layers.enemies.addChild(this.container);
        Game.enemies.push(this);
    }

    destroy() {
        Game.layers.enemies.removeChild(this.container);
        let index = Game.enemies.indexOf(this);
        Game.enemies.splice(index,1);
    }

    explode() {
        if(!this.isAnimating) {
            this.isAnimating = true;
            // this.explosion.visible = true;
            this.sprite.visible = false;

            // this.explosion.onComplete = () => {
                this.destroy();
            // };
            // this.explosion.play();
        }
    }

    move() {
        this.container.x += (this.vx * -1);
    }
    
    update() {
        if(this.container.x < 0) {
            this.destroy();
        }

        if(Collision.box(this.container, Game.player.sprite) && !this.isAnimating) {
            Game.player.hit();
            this.explode();
        }
    }
}