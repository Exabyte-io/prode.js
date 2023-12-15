import { Property } from "../../property";

export class HubbardVProperty extends Property {
    get values() {
        return this.prop("values");
    }
}
