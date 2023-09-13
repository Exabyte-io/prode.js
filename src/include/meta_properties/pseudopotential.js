import _ from "underscore";

import { Property } from "../../property";

export class Pseudopotential extends Property {
    static compatibleExchangeCorrelation = {
        hse06: ["pbe", "hse06"],
    };

    get path() {
        return this.prop("path");
    }

    get filename() {
        return this.prop("filename");
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

    get type() {
        return this.prop("type");
    }

    get version() {
        return this.prop("version");
    }

    /**
     * @summary Attempts filtering raw data by search text, split by "," into multiple regular expressions,
     *           splitting to multiple regexps allows to control the order of filtered items
     *           if raw data is not empty but filtered data is, returns first element of raw data (assumed to be default)
     * @param {Array} rawData
     * @param {String} searchText
     * @note Filters by path!
     */
    static safelyFilterRawDataBySearchText(rawData, searchText = "", separator = ",") {
        if (!searchText) return rawData;
        const filteredData = [];
        searchText.split(separator).forEach((txt) => {
            const text = txt.trim(); // remove whitespace and do nothing if empty string
            if (!text) return;
            try {
                const regexp = new RegExp(text);
                const filteredData_ = rawData.filter((el) => el.path.match(regexp));
                filteredData.push(...filteredData_);
            } catch (e) {
                console.log(e.message);
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
        const { functional } = exchangeCorrelation;
        const isCompatibleWithOther = Object.keys(this.compatibleExchangeCorrelation).includes(
            functional,
        );
        return rawData.filter((item) => {
            return isCompatibleWithOther
                ? this.compatibleExchangeCorrelation[functional].includes(
                      item.exchangeCorrelation?.functional,
                  )
                : functional === item.exchangeCorrelation?.functional;
        });
    }

    // filter unique (assuming that path is always unique)
    static filterUnique(array) {
        return _.uniq(array, (item) => item.path);
    }

    // filter unique by apps (assuming that path is always unique)
    static filterUniqueByAppName(array, appName) {
        return Pseudopotential.filterUnique(this.filterByAppName(array, appName));
    }

    static filterRawDataByPath(rawData, pseudoPath = "") {
        const regexp = new RegExp(pseudoPath);
        return rawData.filter((el) => el.path.match(regexp));
    }

    static filterByAppName(pseudos, appName) {
        return pseudos.filter((pseudo) => pseudo.apps.includes(appName));
    }

    static filterByElements(pseudos, elements) {
        return pseudos.filter((pseudo) => elements.includes(pseudo.element));
    }

    /** Apply several filters at once.
     * @example
     * // filter object
     * {
     *     exchangeCorrelation: {
     *         approximation: "gga",
     *         functional: "pbe"
     *     },
     *     searchText: "gbrv",
     *     appName: "vasp",
     *     elements: ["Si", "Ne", "Fe"],
     * }
     */
    static applyPseudoFilters(pseudos, pseudoFilter) {
        let filteredPseudos = [].concat(pseudos);
        Object.entries(pseudoFilter).forEach(([fKey, fValue]) => {
            if (fKey === "exchangeCorrelation" && fValue) {
                filteredPseudos = this.filterRawDataByExchangeCorrelation(filteredPseudos, fValue);
            } else if (fKey === "searchText" && fValue) {
                filteredPseudos = this.safelyFilterRawDataBySearchText(filteredPseudos, fValue);
            } else if (fKey === "appName" && fValue) {
                filteredPseudos = this.filterByAppName(filteredPseudos, fValue);
            } else if (fKey === "elements" && fValue) {
                filteredPseudos = this.filterByElements(filteredPseudos, fValue);
            } else if (fKey === "type" && fValue) {
                filteredPseudos = this.filterByType(filteredPseudos, fValue);
            }
        });
        return filteredPseudos;
    }

    /**
     * Sorts pseudos by the given pattern.
     * NOTE: This is currently used to prioritize gbrv pseudopotentials over norm-conserving ones for QE.
     */
    static sortPseudosByPattern(pseudos, pattern = "/gbrv/") {
        return pseudos.concat([]).sort((a, b) => {
            return (b.path.includes(pattern) ? 1 : 0) - (a.path.includes(pattern) ? 1 : 0);
        });
    }

    /**
     * Prioritizes pseudos with 'default' and '5.2' (version) in path (VASP)
     */
    static sortByPathVASP(pseudos, version = "5.2") {
        return pseudos.concat([]).sort((a, b) => {
            if (a.path.includes("default") && a.path.includes(version)) {
                return -1;
            }
            if (b.path.includes("default") && b.path.includes(version)) {
                return 1;
            }
            return 0;
        });
    }

    /**
     * @param {Pseudopotential[]} pseudos - Pseudopotentials to filter
     * @param {string} pseudoType - Pseudopotential type (e.g. "us", "nc", ...)
     * @returns {Pseudopotential[]}
     */
    static filterByType(pseudos, pseudoType) {
        return pseudos.filter((pseudo) => pseudo.type.includes(pseudoType));
    }
}
