/**
 *
 */

import BaseComponent from "base/component";

export default BaseComponent.extend({

    name: "viewport-block",


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
     * Properties
     */

    /**
     * @property {Number}
     * @readonly
     */
    width: 10,


    /**
     * @property {Number}
     * @readonly
     */
    height: 10,



    /**
     * Hooks
     */

    /**
     *
     */
    onInsert: function () {

        this.$().css({
            width: `${this.get("width")}em`,
            height: `${this.get("height")}em`
        });

    }.on("didInsertElement")

});
