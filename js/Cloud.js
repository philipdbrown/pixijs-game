/**
 * Class Cloud
 */
class Cloud {
    constructor() {
        this.movement = Math.floor(Math.random() * 6) + 1;
        const file = (Math.random() > 0.5 ? "cloud_1" : "cloud_2");
        
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/images/" + file + ".png"].texture);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(Game.renderer.width * 1.2, Game.renderer.height * Math.random());
        
        /**
         * Setting Random Scaling for the Clouds
         */
        const scale = Math.random() + 0.2;
        this.sprite.scale.set(scale, scale);
        this.container = new Game.Container();


        this.container.addChild(this.sprite);
        Game.layers.background.addChild(this.container);
        Game.clouds.push(this);
    }

    move() {
        this.container.x -= this.movement;
    }

    destroy() {
        Game.layers.background.removeChild(this.container);
    }
}