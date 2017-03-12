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
     * @property {Number} - angle in degrees. "0" means the rover is oriented north
     */
    angle: Em.computed({
        get () {
            return 0;
        },
        set (key, value) {
            return (value + 360) % 360;
        }
    }),


    /**
     * @property {Number}
     */
    angleRadians: function () {
        return this.get("angle") * Math.PI / 180;
    }.property("angle"),


    /**
     * @property {Number}
     * @readonly
     */
    speed: 1,



    /**
     * Methods
     */

    /**
     *
     */
    rotateLeft () {
        this.set("angle", this.get("angle") - 90);
    },


    /**
     *
     */
    rotateRight () {
        this.set("angle", this.get("angle") + 90);
    },


    /**
     *
     */
    move () {

        const
            speed = this.get("speed"),
            angleRadians = this.get("angleRadians"),
            moveX = Math.round(speed * Math.cos(angleRadians)),
            moveY = Math.round(speed * Math.sin(angleRadians));

        this.setProperties({
            positionX: this.get("positionX") + moveX,
            positionY: this.get("positionY") + moveY,
        });

    }

});
