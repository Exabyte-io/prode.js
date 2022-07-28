import _ from "underscore";
import lodash from "lodash";
import { Made } from "@exabyte-io/made.js";

export const ReciprocalPathMixin = (superclass) => class extends superclass {

    get pointsPath() {
        const latticeConfig = lodash.get(this.context, 'material.lattice', {});
        if (!_.isEmpty(latticeConfig)) {
            const rl = new Made.ReciprocalLattice(latticeConfig);
            return rl.extractKpointPath(this.xDataArray);
        }
    }

};
