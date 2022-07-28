import _ from "underscore";
import lodash from "lodash";
import { mix } from "mixwith";

import { Property } from "./property"
import { PROPERTY_CLASS_MAP, PROPERTY_BRANCH_MAP } from "./classmap";
import PROPERTIES_TREE from "./tree";


export class PropertyFactory {
    static Property = Property;
    static classMap = PROPERTY_CLASS_MAP;
    static branchMap = PROPERTY_BRANCH_MAP;
    static methodsTree = {};

    static create(config, methodType) {
        const name = _.isString(config) ?
            config
            :
            lodash.get(config, 'data.name', '') || lodash.get(config, 'name', '');

        const propertyClass = this._propertyClassByName(name);
        const precisionMixin = this._precisionMixinByMethodType(methodType);

        class mixed extends mix(propertyClass).with(precisionMixin) {
            get cls() {
                return propertyClass.name
            }
        }

        // inline class creation
        return new mixed(config);
    }

    static _propertyClassByName(name) {
        const branch = PROPERTIES_TREE[name];
        return this.classMap[name] || this.branchMap[branch.type] || this.Property;
    }

    // TODO: generalize the tree
    static _precisionMixinByMethodType(methodType = 'DFTPseudopotential') {
        return this.methodsTree[methodType] || function () {
        }; // return empty function (class) by default
    }
}
