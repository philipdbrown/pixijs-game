/**
 * Game Static Class
 */
class Game {
    constructor() { }

    static init() {
        Game.gameStatus = 1;

        /**
         * Aliases
         */
        Game.Container = PIXI.Container;
        Game.autoDetectRenderer = PIXI.autoDetectRenderer;
        Game.loader = PIXI.loader;
        Game.resources = PIXI.loader.resources;
        Game.Sprite = PIXI.Sprite;
        Game.TextureCache = PIXI.utils.TextureCache;
        Game.BaseTexture = PIXI.BaseTexture;
        Game.Texture = PIXI.Texture;
        Game.Graphics = PIXI.Graphics;
        Game.Rectangle = PIXI.Rectangle;
        Game.TilingSprite = PIXI.extras.TilingSprite;
        Game.MovieClip = PIXI.extras.MovieClip;

        Game.stage = {
            width: window.innerWidth,
            height: window.innerHeight,
            margin: 10,
            container: new Game.Container(),
            backgroundColor: 0x22A7F0
        };

        Game.tick = 0;
        Game.enemiesInfo = {
            delay: 4,
            max: 10
        };

        Game.cloudInfo = {
            delay: 100,
            max: 50
        };

        Game.birdInfo = {
            delay: 200,
            max: 15
        };

        Game.bullets = [];
        Game.enemies = [];
        Game.clouds = [];
        Game.birds = [];

        /**
         * Just for Fun.  Can remove later
         */
        var type = "WebGL";

        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }

        PIXI.utils.sayHello(type);
        /**
         * End Just for Fun.
         */

        Game.renderer = new Game.autoDetectRenderer(Game.stage.width, Game.stage.height);
        Game.renderer.backgroundColor = Game.stage.backgroundColor;
        document.body.appendChild(Game.renderer.view);

        Game.assetsDir = "assets/images/";

        Game.layers = {
            background: new Game.Container(),
            enemies: new Game.Container(),
            bullets: new Game.Container(),
            text: new Game.Container()
        };

        Game.textFont = {
            fontFamily: "Arial",
            fontSize: 32,
            fill: "black"
        };

        Game.preload();
    }

    static preload() {
        let _onAssetsLoaded = (e, resources) => {
            Game.assets = resources;
            Game.setup();
        };

        Game.loader
            .add(`${Game.assetsDir}cloud_1.png`)
            .add(`${Game.assetsDir}cloud_2.png`)
            .add(`${Game.assetsDir}bird.png`);

        Game.loader.load(_onAssetsLoaded);
    }

    static setup() {
        /**
         * Create the Game
         */
        for (let i in Game.layers) {
            Game.stage.container.addChild(Game.layers[i]);
        }

        Game.loop();
    }

    static loop() {
        requestAnimationFrame(Game.loop);   // What does this do?
        Game.tick++;
        Game.backgroundManager();
        Game.renderer.render(Game.stage.container);

    }

    static backgroundManager() {
        if (Game.tick % Game.cloudInfo.delay === 0) {
            let cloud = new Cloud();
        }

        if (Game.tick % Game.birdInfo.delay === 0) {
            let bird = new Bird();
        }


        for (let j in Game.clouds) {
            /**
             * If the Cloud is Not Visible Anymore, Destroy it and Remove from the Array.
             */
            if (Game.clouds[j].container.position.x < Game.renderer.width * -1.3) {
                Game.clouds[j].destroy();
                Game.clouds.splice(j, 1);
            }
            else {
                Game.clouds[j].move();
            }
        }

        for (let i in Game.birds) {
            /**
             * If the Bird is Not Visible Anymore, Destroy it and Remove from the Array.
             */
            if (Game.birds[i].container.position.x < Game.renderer.width * -1.3) {
                Game.birds[i].destroy();
                Game.birds.splice(i, 1);
            }
            else {
                Game.birds[i].move();
            }
        }
    }


}