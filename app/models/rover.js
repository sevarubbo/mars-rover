/**
 *
 */

export default Em.Object.extend({

    /**
     * Properties
     */

    /**
     * @property {Number}
     */
    positionX: 0,


    /**
     * @property {Number}
     */
    positionY: 0,


    /**
     * @property {Number} - angle in degrees. "0" means the rover is oriented East
     */
    angle: 0,


    /**
     * @property {Number}
     * @readonly
     */
    angleRadians: function () {
        return this.get("angle") * Math.PI / 180;
    }.property("angle"),


    /**
     * @property {Number}
     * @readonly
     */
    normalizedAngle: function () {
        return (this.get("angle") + 360) % 360;
    }.property("angle"),


    /**
     * @property {Number} - Number of cells to move when rover receives "Move" command
     * @readonly
     */
    stepLength: 1,


    /**
     * @property {Em.Object}
     */
    actionQueue: Em.Object.extend({

        /**
         * @property {Function[]}
         * @readonly
         */
        queue: [],


        /**
         *
         * @param {Function} action
         */
        add (action) {

            const
                queue = this.get("queue"),
                item = {
                    action () {
                        action().then(() => {
                            const next = queue.objectAt(queue.indexOf(item) + 1);
                            if (next) {
                                next.action();
                            }
                            queue.shift();
                        });
                    }
                };

            if (!queue.get("length")) {
                item.action();
            }

            queue.pushObject(item);

        },


        /**
         *
         */
        clear () {
            this.get("queue").clear();
        }

    }).create(),



    /**
     * Methods
     */

    /**
     *
     * @return {Promise}
     */
    rotateLeft () {
        this.get("actionQueue").add(this._rotateLeft.bind(this));
    },

    /**
     *
     * @return {Promise}
     */
    rotateRight () {
        this.get("actionQueue").add(this._rotateRight.bind(this));
    },


    /**
     *
     */
    move () {
        this.get("actionQueue").add(this._move.bind(this));
    },


    stop () {
        this.get("actionQueue").clear();
    },


    /**
     *
     * @return {Promise}
     */
    _move () {

        const
            stepLength = this.get("stepLength"),
            angleRadians = this.get("angleRadians"),
            positionX = this.get("positionX"),
            positionY = this.get("positionY"),
            targetPositionX = positionX + Math.round(stepLength * Math.cos(angleRadians)),
            targetPositionY = positionY + Math.round(stepLength * Math.sin(angleRadians));

        return new Em.RSVP.Promise(resolve => {

            const i = setInterval(() => {

                this.setProperties({
                    positionX: this.get("positionX") + (targetPositionX - positionX) / 10,
                    positionY: this.get("positionY") + (targetPositionY - positionY) / 10,
                });

                if (Math.abs(targetPositionX - this.get("positionX")) < 0.1 && Math.abs(targetPositionY - this.get("positionY")) < 0.1) {
                    this.setProperties({
                        positionX: targetPositionX,
                        positionY: targetPositionY,
                    });

                    clearInterval(i);
                    resolve();
                }

            }, 30);

        });

    },


    /**
     *
     * @return {Promise}
     */
    _rotateLeft () {

        const targetAngle = this.get("angle") - 90;

        return new Em.RSVP.Promise(resolve => {
            (function rotate () {
                this.set("angle", this.get("angle") - 3);
                if (this.get("angle") > targetAngle) {
                    Em.run.later(this, rotate, 30);
                } else {
                    this.set("angle", targetAngle);
                    resolve();
                }
            }).call(this);
        });

    },


    /**
     *
     * @return {Promise}
     */
    _rotateRight () {

        const targetAngle = this.get("angle") + 90;

        return new Em.RSVP.Promise(resolve => {

            const i = setInterval(() => {
                this.set("angle", this.get("angle") + 3);
                if (this.get("angle") >= targetAngle) {
                    this.set("angle", targetAngle);
                    clearInterval(i);
                    resolve();
                }
            }, 30);

        });

    },

});
