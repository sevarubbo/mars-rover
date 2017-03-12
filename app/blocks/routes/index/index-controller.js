/**
 *
 */

import Rover from "models/rover";
import Plateau from "models/plateau";

export default Em.Controller.extend({

    /**
     * Properties
     */

    /**
     * @property {App.Rover}
     * @readonly
     */
    rover: Rover.create({
        positionX: 2,
        positionY: 4
    }),


    /**
     * @property {App.Plateau}
     * @readonly
     */
    plateau: Plateau.create({
        positionX: 1,
        positionY: 2,
        width: 6,
        height: 5
    }),


    /**
     * @property {Boolean}
     * @readonly
     */
    isGameOver: false,



    /**
     * Hooks
     */

    /**
     *
     */
    onRoverPositionChange: function () {

        const rover = this.get("rover");

        if (!this.get("plateau").containsPoint(rover.get("positionX"), rover.get("positionY"))) {
            rover.stop();
            this.set("isGameOver", true);
        }

    }.observes("rover.positionX", "rover.positionY"),



    /**
     * Actions
     */
    actions: {

        /**
         *
         */
        restart () {

            this.set("isGameOver", false);

            this.get("rover").setProperties({
                positionX: 2,
                positionY: 3,
                angle: 0
            });

        }
    }

});
