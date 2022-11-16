/* eslint-disable no-unused-vars */
import { NamedInMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import { flattenObject } from "@exabyte-io/code.js/dist/utils";
import lodash from "lodash";
import _ from "underscore";

import { PROPERTY_TYPES } from "./settings";
import PROPERTIES_TREE from "./tree";

export class Property extends NamedInMemoryEntity {
    // try extracting props from data directly if not found on top-level
    prop(name, defaultValue) {
        // eslint-disable-next-line prefer-rest-params
        return super.prop(...arguments) || this.propFromData(...arguments);
    }

    propFromData(name, defaultValue) {
        return lodash.get(this._json, `data.${name}`, defaultValue);
    }

    get context() {
        return this.prop("context");
    }

    get data() {
        return this.prop("data");
    }

    get units() {
        return this.prop("units");
    }

    get precision() {
        return this.prop("precision", {});
    }

    // schema version for this property/monitor
    get schemaVersion() {
        return this.prop("schemaVersion");
    }

    get sourceInfo() {
        return this.prop("source.info") || {};
    }

    /**
     * @summary Group is string in format 'type:subtype', where 'type' and 'subtype' are properties of the model.
     * @return {String}
     */
    get group() {
        return this.prop("group");
    }

    get slug() {
        return this.prop("slug");
    }

    get exabyteId() { return this.prop("exabyteId"); }

    get type() {
        return this.propertyBranch.type || null;
    }

    /**
     * @summary Convert name for pretty print.
     * @returns {string}
     * @example
     * p.name;       // "total_energy"
     * p.prettyName; // "Total energy"
     */
    get prettyName() {
        return Property.prettifyName(this.name);
    }

    static prettifyName(name) {
        return (name.charAt(0).toUpperCase() + name.slice(1)).replace("_", " ");
    }

    static get propertyTree() {
        return PROPERTIES_TREE;
    }

    static get scalarsSubTree() {
        return _.pick(Property.propertyTree, (val, key) => Property.isScalar(val));
    }

    // returns the branch corresponding to properties to be refined (or "Characteristics" previously)
    static get refinedSubTree() {
        return _.pick(Property.propertyTree, (val, key) => Property.isRefined(val));
    }

    static get nonScalarsSubTree() {
        return _.pick(Property.propertyTree, (val, key) => !Property.isScalar(val));
    }

    static get convergencesSubTree() {
        return _.pick(Property.propertyTree, (val, key) => Property.isConvergence(val));
    }

    static propertyBranch(propertyName) {
        const tree = Property.propertyTree;
        // safely return empty object in case the tree does not contain the name key
        return _.find(tree, (v, k) => (k === propertyName || (v && v.name === this.name))) || {};
    }

    static isScalar(propertyConfig) {
        return propertyConfig.type === PROPERTY_TYPES.scalar;
    }

    static isConvergence(propertyConfig) {
        // eslint-disable-next-line no-prototype-builtins
        if (propertyConfig.hasOwnProperty("isConvergence")) return propertyConfig.isConvergence;
        return false;
    }

    static isRefined(propertyConfig) {
        // eslint-disable-next-line no-prototype-builtins
        if (propertyConfig.hasOwnProperty("isRefined")) return propertyConfig.isRefined;
        return false;
    }

    get propertyBranch() {
        const tree = Property.propertyTree;
        // safely return empty object in case the tree does not contain the name key
        return _.find(tree, (v, k) => (k === this.name || (v && v.name === this.name))) || {};
    }

    get isScalar() {
        return this.propertyBranch.type === PROPERTY_TYPES.scalar;
    }

    get isTensor() {
        return this.propertyBranch.type === PROPERTY_TYPES.tensor;
    }

    get isObject() {
        return this.propertyBranch.type === PROPERTY_TYPES.object;
    }

    get isConvergence() {
        return this.propertyBranch.isConvergence;
    }

    get isAbleToReturnMultipleResults() {
        return this.propertyBranch.isAbleToReturnMultipleResults;
    }

    flattenProperties() {
        return [flattenObject(this.prop("data"))];
    }

    /**
     * @summary Adds slug & group property to characteristic. They used for forming column name.
     * 'group' property will contain model type/subtype. Band gap characteristic is splitted before.
     * @return {Array}
     */
    toRowValues() {
        return [
            {
                ...this.toJSON(),
                slug: this.slug,
                group: this.group,
            },
        ];
    }

    /**
     * @summary Converts property name used in manifest to name used in Properties collection.
     * @param propName {String}
     * @return {String}
     * @example
     * Property.normalizePropertyName("pressure");         // "pressure"
     * Property.normalizePropertyName("band_gaps:direct"); // "band_gaps"
     */
    static normalizePropertyName(propName) {
        return propName.split(":")[0];
    }

    static get refinedPropertyNames() {
        return Object.keys(this.refinedSubTree);
    }

    // whether to omit a given property inside results. Defaults to false.
    static omitInResults(propertyName) {
        return Property.propertyBranch(propertyName).omitInResults;
    }
}
