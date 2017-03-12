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
        positionX: 1,
        positionY: 2
    }),


    /**
     * @property {App.Plateau}
     * @readonly
     */
    plateau: Plateau.create({
        positionX: 1,
        positionY: 2,
        width: 5,
        height: 3
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

        const
            rover = this.get("rover"),
            isOnPlateau = this.get("plateau").containsPoint(rover.get("positionX"), rover.get("positionY"));

        if (!isOnPlateau) {
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
                positionX: 1,
                positionY: 2,
                angle: 0
            });

        }
    }

});
