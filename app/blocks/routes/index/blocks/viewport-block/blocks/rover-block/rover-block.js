/**
 *
 */

import BaseComponent from "base/component";

export default BaseComponent.extend({

    name: "rover-block",



    /**
     * Attributes
     */

    /**
     * @property {App.Rover}
     * @readonly
     */
    rover: null,


    /**
     * @property {Number}
     * @readonly
     */
    cellSize: null,



    /**
     * Hooks
     */

    /**
     *
     */
    onPositionChange: function () {

        const
            cellSize = this.get("cellSize"),
            x = this.get("rover.positionX") * cellSize,
            y = this.get("rover.positionY") * cellSize,
            angle = this.get("rover.angle");

        this.$().css({
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
        });

    }.observes("rover.positionX", "rover.positionY", "rover.angle")

});
