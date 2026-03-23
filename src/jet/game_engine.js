import { DrawingContext } from './drawing_context.js';

export class GameEngine {
    /**
     * @param {import('./game_object.js').GameObject} rootGameObj
     * @param {import('./game_object.js').GameObject} camera
     * @param {HTMLCanvasElement} canvas
     * @param {number} updateIntervalMs
     */
    constructor(rootGameObj, camera, canvas, updateIntervalMs) {
        this._drawingContext = new DrawingContext(canvas);
        this._lastUpdateTimeMs = 0;
        this._accumulatedTimeMs = 0;
        this._updateIntervalMs = updateIntervalMs;
        this._rootGameObj = rootGameObj;
        this._camera = camera;
        /** @type {null | number} */
        this._updateCallId = null;
        this._started = false;
    }

    /**
     * @param {number} timeMs
     */
    _update = (timeMs) => {
        if (!this._started) {
            return;
        }
        this._accumulatedTimeMs += timeMs - this._lastUpdateTimeMs;
        this._lastUpdateTimeMs = timeMs;
        let rootGameObjUpdated = false;
        while (this._accumulatedTimeMs >= this._updateIntervalMs) {
            this._accumulatedTimeMs -= this._updateIntervalMs;
            this._rootGameObj.update(this._updateIntervalMs);
            rootGameObjUpdated = true;
        }
        if (rootGameObjUpdated) {
            this._drawingContext.canvasContext.clearRect(
                0,
                0,
                this._drawingContext.canvas.width,
                this._drawingContext.canvas.height
            );
            this._drawingContext.canvasContext.save();
            this._drawingContext.canvasContext.translate(
                -this._camera.position.x,
                -this._camera.position.y
            );
            this._rootGameObj.draw(this._drawingContext);
            this._drawingContext.canvasContext.restore();
        }
        this._scheduleUpdateCall();
    };

    _scheduleUpdateCall() {
        this._updateCallId = requestAnimationFrame(this._update);
    }

    _unscheduleUpdateCall() {
        if (this._updateCallId) {
            cancelAnimationFrame(this._updateCallId);
            this._updateCallId = null;
        }
    }

    start() {
        if (this._started) {
            return;
        }
        this._started = true;
        this._scheduleUpdateCall();
    }

    stop() {
        if (!this._started) {
            return;
        }
        this._started = false;
        this._unscheduleUpdateCall();
    }
}
