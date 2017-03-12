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
    cellSize: 50,

});
