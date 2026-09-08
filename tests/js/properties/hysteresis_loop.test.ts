/* eslint-disable no-unused-expressions */
import ExampleHysteresisLoop from "@mat3ra/esse/dist/js/example/properties_directory/non_scalar/hysteresis_loop.json";
import type { HysteresisLoopPropertySchema } from "@mat3ra/esse/dist/js/types";
import { expect } from "chai";

import HysteresisLoopProperty from "../../../src/js/properties/non-scalar/HysteresisLoopProperty";
import { PropertyName, PropertyType } from "../../../src/js/settings";

describe("HysteresisLoopProperty", () => {
    const config: Omit<HysteresisLoopPropertySchema, "name"> =
        ExampleHysteresisLoop as unknown as Omit<HysteresisLoopPropertySchema, "name">;

    it("should create a hysteresis loop property with correct constructor, propertyType, propertyName, and defined properties", () => {
        const hysteresisLoopProperty = new HysteresisLoopProperty(config);

        // Test basic properties
        expect(hysteresisLoopProperty).to.be.instanceOf(HysteresisLoopProperty);
        expect(HysteresisLoopProperty.propertyType).equal(PropertyType.non_scalar);
        expect(HysteresisLoopProperty.propertyName).equal(PropertyName.hysteresis_loop);
        expect(HysteresisLoopProperty.isRefined).to.be.true;

        // Test defined properties
        expect(hysteresisLoopProperty.subtitle).to.equal("Hysteresis Loop");
        expect(hysteresisLoopProperty.yAxisTitle).to.equal("Response (m)");
        expect(hysteresisLoopProperty.xAxisTitle).to.equal("Bias (V)");
        expect(hysteresisLoopProperty.chartConfig).to.exist;
        expect(hysteresisLoopProperty.chartConfig).to.be.an("object");
        expect(
            hysteresisLoopProperty.chartConfig.series?.map((series) => series.name),
        ).to.deep.equal(["On-field", "Off-field"]);

        // Test loop parameters
        expect(hysteresisLoopProperty.parameters).to.deep.equal(config.parameters);
    });

    it("shows the legend so the on and off series are distinguishable", () => {
        const property = new HysteresisLoopProperty(config);
        expect(
            (property.chartConfig.legend as { enabled?: boolean } | undefined)?.enabled,
        ).to.equal(true);
        expect(property.chartConfig.legend).to.have.property("verticalAlign", "bottom");
    });
});
