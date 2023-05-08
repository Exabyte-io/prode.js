import { Property } from "../../property";

// by default this is a 2d array: eg. [ [], [], []]
export class TensorProperty extends Property {
    /* the logic below supports transition for atomic forces from previously used format:
     *   {
     *       "name": "atomic_forces",
     *       "units": "eV/bohr",
     *       "value": [
     *           [
     *               0.0,
     *               -0.0,
     *               -0.0
     *           ],
     *           [
     *               -0.0,
     *               0.0,
     *               0.0
     *           ]
     *       ]
     *   }
     * to
     *   {
     *       "units": "eV/bohr",
     *       "values": [
     *           {
     *               "id": 1,
     *               "value": [
     *                   0.0,
     *                   -0.0,
     *                   -0.0
     *               ]
     *           },
     *           {
     *               "id": 2,
     *               "value": [
     *                   -0.0,
     *                   0.0,
     *                   0.0
     *               ]
     *           }
     *       ],
     *       "name": "atomic_forces"
     *   }
     */
    get values() {
        return this.prop("value") || this.prop("values", []).map((x) => x.value);
    }
}
