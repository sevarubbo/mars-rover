/**
 *
 */

import BaseComponent from "base/component";

export default BaseComponent.extend({

    name: "rover-controls",



    /**
     * Attributes
     */

    /**
     * @property {App.Rover}
     * @readonly
     */
    rover: null,



    /**
     * Actions
     */
    actions: {

        /**
         *
         */
        rotateLeft () {
            this.get("rover").rotateLeft();
        },


        /**
         *
         */
        rotateRight () {
            this.get("rover").rotateRight();
        },


        /**
         *
         */
        move () {
            this.get("rover").move();
        }

    }

});
