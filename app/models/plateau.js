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
     * @property {Number}
     */
    width: 1,


    /**
     * @property {Number}
     */
    height: 1,



    /**
     * Methods
     */

    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @return {Boolean}
     */
    containsPoint (x, y) {

        const
            ix = this.get("positionX"),
            ax = ix + this.get("width"),
            iy = this.get("positionY"),
            ay = iy + this.get("height");

        return ix <= x && ax > x && iy <= y && ay > y;

    }

});
