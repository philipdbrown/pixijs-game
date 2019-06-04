/**
 * Collision Class
 */
class Collision {
    constructor() {}

    static box(r1, r2) {
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
        
        hit = false;

        /**
         * Find Centers
         */
        r1.centerX = r1.x + (r1.width / 2);
		r1.centerY = r1.y + (r1.height / 2);
		r2.centerX = r2.x + (r2.width / 2);
        r2.centerY = r2.y + (r2.height / 2);
        
        /**
         * Find the Half-Widths and Half-Heights of Each Sprite
         */
        r1.halfWidth = r1.width / 2;
		r1.halfHeight = r1.height / 2;
		r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;
        
        /**
         * Distance Between Sprites
         */
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
        
        /**
         * Combined Half Distances of Two
         */
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
        
        /**
         * Check for a Collision on the X Asis
         */
        if (Math.abs(vx) < combinedHalfWidths) {
            /**
             * A collision might be occurring.
             * Check for a collision on the y axis.
             */
			if (Math.abs(vy) < combinedHalfHeights) {
				/**
                 * There is a collision.
                 */
				hit = true;
			} else {
				/**
                 * There's no collision on the Y axis.
                 */
				hit = false;
			}
		} else {
			/**
             * There's no collision on the X axis.
             */
			hit = false;
		}

		return hit;
    }
}