import { deepClone, flattenObject } from "@exabyte-io/code.js/dist/utils";

import { Property } from "../../property";

export class BandGapsProperty extends Property {
    get eigenvalues() {
        return this.prop("eigenvalues");
    }

    get values() {
        return this.prop("values");
    }

    /**
     * @summary Adds slug & group property to characteristic. They used for forming column name.
     * 'group' property will contain model type/subtype. Band gap characteristic is split before.
     * @return {Array}
     */
    toRowValues() {
        return [this.toJSONByType("direct"), this.toJSONByType("indirect")];
    }

    flattenProperties() {
        const obj = this.prop("data");
        return obj.values
            .map((x) => {
                return {
                    name: `${obj.name}:${x.type}`,
                    value: x.value,
                };
            })
            .map((x) => flattenObject(x));
    }

    /**
     * @summary Gets specified band gap (direct/indirect) and returns it in simplified form (as pressure).
     * Characteristic name will be `band_gaps:<type>`
     * @param type {String}
     */
    toJSONByType(type) {
        const ch = this.toJSON();
        const bandGapByType = deepClone(ch);
        const directData = ch.data.values.find((x) => x.type === type);
        const name = `band_gaps:${type}`;
        bandGapByType.data = { ...directData, name };
        return Object.assign(bandGapByType, {
            slug: name,
            group: this.group,
        });
    }

    /**
     * @summary Converts QueryBuilder selector into mongo selector by value.
     * @param name {String} band_gaps:direct/band_gaps:indirect
     * @param selector {Object} Mongo selector
     * @return {Object}
     */
    static normalizeSelectorByDataField(name, selector) {
        const bgSelector = { name: "band_gaps" };
        // name is in 'band_gaps:direct' format
        const type = name.split(":")[1]; // direct/indirect
        bgSelector.values = {
            $elemMatch: {
                type,
                value: selector,
            },
        };

        return bgSelector;
    }
}
