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
     * Properties
     */

    /**
     * @property {String}
     */
    actionSequence: "LLMRMRMMMLMR",



    /**
     * Actions
     */
    actions: {

        /**
         *
         */
        submitSequence () {

            const rover = this.get("rover");

            this.get("actionSequence").split("").forEach(code => {

                switch (code.toUpperCase()) {
                    case "L": {
                        rover.rotateLeft();
                        break;
                    }
                    case "R": {
                        rover.rotateRight();
                        break;
                    }
                    case "M": {
                        rover.move();
                        break;
                    }
                }

            });
        }

    }

});
