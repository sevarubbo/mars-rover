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
     * Hooks
     */

    /**
     *
     */
    onInsert: function () {

        const
            plateau = this.get("plateau");

        this.$().css({
            top: `${plateau.get("positionY")}em`,
            left: `${plateau.get("positionX")}em`,
            width: `${plateau.get("width")}em`,
            height: `${plateau.get("height")}em`
        });

    }.on("didInsertElement")

});
