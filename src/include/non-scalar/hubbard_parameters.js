import { Property } from "../../property";

export class HubbardParametersProperty extends Property {
    get values() {
        return this.prop("values");
    }
}
