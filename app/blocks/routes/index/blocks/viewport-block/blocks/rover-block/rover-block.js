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
     * @property {App.Plateau}
     * @readonly
     */
    plateau: null,



    /**
     * Hooks
     */

    /**
     *
     */
    onPositionChange: function () {

        const
            x = this.get("rover.positionX"),
            y = this.get("rover.positionY"),
            angle = this.get("rover.angle");

        this.$().css({
            transform: `translate(${x}em, ${y}em) rotate(${angle}deg)`
        });

    }.observes("rover.positionX", "rover.positionY", "rover.angle").on("didInsertElement"),

});
