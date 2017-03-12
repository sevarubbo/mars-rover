/**
 *
 */

import Rover from "models/rover";

export default Em.Controller.extend({

    /**
     * Properties
     */

    /**
     * @property {App.Rover}
     * @readonly
     */
    rover: new Rover(),

});
