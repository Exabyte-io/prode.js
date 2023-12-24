import { Property } from "./property";

export class PropertyWithValues extends Property {
    get values() {
        return this.prop("values");
    }
}
