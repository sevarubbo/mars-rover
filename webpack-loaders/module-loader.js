const
    path = require("path"),
    compiler = require("components-ember/ember-template-compiler"),
    recursive = require("recursive-readdir-sync"),
    s = require("underscore.string");

/**
 * @class
 */
class EmberModule {

    /**
     * @param {String} filePath
     */
    constructor (filePath) {

        const
            filename = filePath.split("/").slice(-1)[0].replace(".js", ""),
            postfix = filename.split("-").slice(-1)[0],
            rootDir = filePath.split("/")[0],
            folder = filePath.split("/").slice(-2)[0];

        this.isModel = rootDir === "models";
        this.isController = postfix === "controller";
        this.isAdapter = rootDir === "adapters";
        this.isSerializer = rootDir === "serializers";
        this.isHelper = rootDir === "helpers";
        this.isRoute = postfix === "route";
        this.isComponent = folder === filename;

        this.filePath = filePath;
        this.filename = filename;

    }


    /**
     * @return {String}
     */
    getClassName () {

        if (this.isModel) {
            return s.classify(this.filename);
        } else if (this.isComponent) {
            return s.classify(this.filename + "-component");
        } else if (this.isAdapter) {
            return s.classify(this.filename + "-adapter");
        } else if (this.isSerializer) {
            return s.classify(this.filename + "-serializer");
        } else if (this.isHelper) {
            return s.classify(this.filename + "-helper");
        } else if (this.isController) {

            const name = this.filePath
                .replace(/^blocks\/routes\//, "")
                .replace(/\/pages/g, "")
                .split("/")
                .slice(0, -1)
                .join("-");

            return s.classify(name + "-controller");

        } else if (this.isRoute) {

            const name = this.filePath
                .replace(/^blocks\/routes\//, "")
                .replace(/\/pages/g, "")
                .split("/")
                .slice(0, -1)
                .join("-");

            return s.classify(name + "-route");

        }

    }

}

module.exports = function (content) {

    const
        appDir = "app",
        modulePaths = recursive(appDir).filter(filePath => {
            return /\.js$/.test(filePath) && filePath.split("/").length > 2;
        }).map(filePath => {
            return filePath.replace(appDir, ".");
        }),
        imports = modulePaths.map(filePath => {
            const propertyName = new EmberModule(filePath.replace("./", "")).getClassName();

            if (!propertyName) {
                return "";
            }

            return `
                import ${propertyName} from "${filePath}";
                App.${propertyName} = ${propertyName}
            `;
        });

    content += imports.join("");

    return content;

};