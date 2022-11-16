import { Made } from "@exabyte-io/made.js";
import lodash from "lodash";
import _ from "underscore";

export const ReciprocalPathMixin = (superclass) => class extends superclass {
    // eslint-disable-next-line getter-return
    get pointsPath() {
        const latticeConfig = lodash.get(this.context, "material.lattice", {});
        if (!_.isEmpty(latticeConfig)) {
            const rl = new Made.ReciprocalLattice(latticeConfig);
            return rl.extractKpointPath(this.xDataArray);
        }
    }
};
