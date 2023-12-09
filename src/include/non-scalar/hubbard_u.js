import { Property } from "../../property";

export class HubbardUProperty extends Property {
    get values() {
        return this.prop("values");
    }
}
