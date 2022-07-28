import { expect } from "chai";

import { Property } from "../src/property";
import { PROPERTIES } from "../src/settings";

describe("Property", () => {
    const obj = { name: PROPERTIES.pressure };

    it("can be created", () => {
        const app = new Property(obj);
        expect(app.prettyName).to.equal("Pressure");
    });
});
