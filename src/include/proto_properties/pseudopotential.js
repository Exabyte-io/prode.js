import path from "path";
import _ from "underscore";

import { Property } from "../../property";

export class Pseudopotential extends Property {
    get path() {
        return this.prop("path");
    }

    get basename() {
        return path.basename(this.path);
    }

    get isCustom() {
        return this.prop("source") === "user";
    }

    get element() {
        return this.prop("element");
    }

    get apps() {
        return this.prop("apps");
    }

    get exchangeCorrelation() {
        return this.prop("exchangeCorrelation");
    }

    /**
     * @summary Attempts filtering raw data by search text, split by "," into multiple regular expressions,
     *           splitting to multiple regexps allows to control the order of filtered items
     *           if raw data is not empty but filtered data is, returns first element of raw data (assumed to be default)
     * @param {Array} rawData
     * @param {String} searchText
     */
    static safelyFilterRawDataBySearchText(rawData, searchText = "") {
        if (!searchText) return rawData;
        const filteredData = [];
        searchText.split(",").forEach((txt) => {
            const text = txt.trim(); // remove whitespace and do nothing if empty string
            if (!text) return;
            try {
                const regexp = new RegExp(text);
                const filteredData_ = rawData.filter((el) => el.path.match(regexp));
                filteredData.push(...filteredData_);
            } catch (e) {
                sAlert.warning(e.message);
            }
        });
        return filteredData.length ? filteredData : rawData.splice(0, 1);
    }

    /**
     * @summary Exclusive filter of raw data by all fields of the passed object
     * @param {Array} rawData
     * @param {Object} exchangeCorrelation
     * @param {String} exchangeCorrelation.approximation
     * @param {String} exchangeCorrelation.functional
     */
    static filterRawDataByExchangeCorrelation(rawData, exchangeCorrelation) {
        return rawData.filter((el) =>
            Object.keys(exchangeCorrelation).reduce(
                (mem, key) => mem && el.exchangeCorrelation[key] === exchangeCorrelation[key],
            ),
        );
    }

    // filter unique (assuming that path is always unique)
    static filterUnique(array) {
        return _.uniq(array, (item) => item.path);
    }

    // filter unique by apps (assuming that path is always unique)
    static filterUniqueByAppName(array, appName) {
        return Pseudopotential.filterUnique(array).filter((item) => item.apps.includes(appName));
    }

    // eslint-disable-next-line no-shadow
    static filterRawDataByPath(rawData, path = "") {
        const regexp = new RegExp(path);
        return rawData.filter((el) => el.path.match(regexp));
    }

    /**
     * Sorts pseudos by the given pattern.
     * NOTE: This is currently used to prioritize gbrv pseudopotentials over norm-conserving ones for QE.
     */
    static sortPseudosByPattern(pseudos, pattern = "/gbrv/") {
        return pseudos.concat([]).sort((a, b) => {
            // eslint-disable-next-line no-constant-condition
            return (1 ? a.path.includes(pattern) : 0) - (1 ? b.path.includes(pattern) : 0);
        });
    }
}
