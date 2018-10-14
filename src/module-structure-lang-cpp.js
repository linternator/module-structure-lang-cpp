"use strict";

const fs = require("fs");
const path = require("path");

class CPPLanguageProvider {
    
    /**
     * @public
     * @param {string} modulePath The file path of the current module to provide dependencies for.
     * @param {string} rootPath The root path of the code base. Some external libraries require this.
     * @returns {Array<string>} A list of relative file paths to dependent modules.
     */
    getDependencies(modulePath, rootPath) {
       
        const fileLines = fs.readFileSync(modulePath, "utf-8").split("\n");

        let ret = [];

        let moduleDirectory = path.dirname(modulePath);

        fileLines.forEach(function(element) {

            if(element.startsWith("#include")){

                var p = element.replace('"', "").replace("#include", "").replace("/","\\").replace('"', "").trim();

                console.log(modulePath);
                console.log(p);

                if(fs.existsSync(moduleDirectory + "/" + p)){

                    ret.push(".\\" + p);
                    console.log("PP");

                } else {

                    p = rootPath + "\\" + element.replace('"', "").replace("#include", "").replace("/","\\").replace('"', "").trim();
                    ret.push(path.relative(moduleDirectory, p));

                }

            }

        });

       return ret;
       
    }
}

module.exports = function() {
    return new CPPLanguageProvider();
};