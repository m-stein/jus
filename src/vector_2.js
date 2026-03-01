export class Vector2 {
    
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector2} other
     * @returns {number}
     */
    distanceTo(other) {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }

    /**
     * @returns {Vector2}
     */
    copy() {
        return new Vector2(this.x, this.y);
    }

    /**
     * @param {Vector2} other
     * @returns {boolean}
     */
    equals(other) {
        return this.x == other.x && this.y == other.y;
    }

    /**
     * @param {Vector2} other
     * @returns {Vector2}
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    /**
     * @param {number} factor
     * @returns {Vector2}
     */
    scale(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    /**
     * @param {Vector2} other
     * @returns {Vector2}
     */
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    /**
     * @returns {number}
     */
    length() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * @returns {Vector2}
     */
    normalized() {
        const len = this.length();
        if (len === 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x / len, this.y / len);
    }

    /**
     * @returns {string}
     */
    toString() {
        return `Vector2(x=${this.x}, y=${this.y})`;
    }
}
