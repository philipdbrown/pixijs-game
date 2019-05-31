/**
 * Class Bird
 */
class Bird {
    constructor() {
        this.movement = Math.floor(Math.random() * 6) + 1;
        const scale = (Math.floor(Math.random() * 15) + 5) / 100;

        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/images/bird.png"].texture);
        this.sprite.scale.set(scale);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(Game.renderer.width * 1.2, Game.renderer.height * Math.random());
        this.container = new Game.Container();

        this.container.addChild(this.sprite);
        Game.layers.background.addChild(this.container);
        Game.birds.push(this);
    }

    move() {
        this.container.x -= this.movement;
    }

    destroy() {
        Game.layers.background.removeChild(this.container);
    }
}