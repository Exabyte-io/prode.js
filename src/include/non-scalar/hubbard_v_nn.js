import { Property } from "../../property";

export class HubbardVNNProperty extends Property {
    get values() {
        return this.prop("values");
    }
}
