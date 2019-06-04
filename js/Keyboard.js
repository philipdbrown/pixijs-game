/**
 * Keyboard class
 */
class Keyboard {
    constructor(keyCode) {
        
        this.keyCode = keyCode;
        this.isDown = false;
        this.isUp = true;

        this.press = undefined;
        this.release = undefined;

        //Events
        document.addEventListener("keydown", this.downHandler.bind(this), false);
        document.addEventListener("keyup", this.upHandler.bind(this), false);
    }

   downHandler(e) {
       if (e.keyCode === this.keyCode) {
           if (this.isUp && this.press) {
               this.press();
           }
           this.isDown = true;
           this.isUp = false;
       }
       e.preventDefault();
   }

   upHandler(e) {
       if (e.keyCode === this.keyCode) {
           if (this.isDown && this.release) {
               this.release();
           }
           this.isDown = false;
           this.isUp = true;
       }
       e.preventDefault();
   }
}