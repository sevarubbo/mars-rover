/**
 *
 */

import BaseComponent from "base/component";

export default BaseComponent.extend({

    name: "rectangular-plateau",



    /**
     * Attributes
     */

    /**
     * @property {App.Plateau}
     * @readonly
     */
    plateau: null,


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
    onInsert: function () {

        const
            plateau = this.get("plateau"),
            cellSize = this.get("cellSize");

        this.$().css({
            top: plateau.get("positionY") * cellSize,
            left: plateau.get("positionX") * cellSize,
            width: plateau.get("width") * cellSize,
            height: plateau.get("height") * cellSize
        });

    }.on("didInsertElement")

});
