import _ from "lodash";

import { PROPERTY_BRANCH_MAP, PROPERTY_CLASS_MAP } from "./classmap";
import { Property } from "./property";
import PROPERTIES_TREE from "./tree";

export class PropertyFactory {
    static Property = Property;

    static classMap = PROPERTY_CLASS_MAP;

    static branchMap = PROPERTY_BRANCH_MAP;

    static methodsTree = {};

    static create(config, methodType) {
        const name = _.isString(config)
            ? config
            : _.get(config, "data.name", "") || _.get(config, "name", "");

        const PropertyClass = this._propertyClassByName(name);
        const precisionFn = this._precisionFunctionByMethodType(methodType);

        // add precision function directly to avoid mixins
        PropertyClass.prototype.calculatePrecision = precisionFn;

        return new PropertyClass(config);
    }

    static _propertyClassByName(name) {
        const branch = PROPERTIES_TREE[name];
        return this.classMap[name] || this.branchMap[branch.type] || this.Property;
    }

    // TODO: generalize the tree
    static _precisionFunctionByMethodType(methodType = "DFTPseudopotential") {
        // eslint-disable-next-line func-names
        return this.methodsTree[methodType] || function () {}; // return empty function (class) by default
    }
}
