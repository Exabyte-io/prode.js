import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type {
    BaseInMemoryEntitySchema,
    HysteresisLoopPropertySchema,
} from "@mat3ra/esse/dist/js/types";

export type HysteresisLoopPropertySchemaMixin = Omit<
    HysteresisLoopPropertySchema,
    "_id" | "slug" | "systemName" | "schemaVersion"
>;

export type HysteresisLoopPropertyInMemoryEntity = InMemoryEntity<
    BaseInMemoryEntitySchema & HysteresisLoopPropertySchemaMixin
>;

export function hysteresisLoopPropertySchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HysteresisLoopPropertySchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<HysteresisLoopPropertySchemaMixin> &
        HysteresisLoopPropertySchemaMixin = {
        get xAxis() {
            return this.requiredProp("xAxis");
        },
        set xAxis(value: HysteresisLoopPropertySchema["xAxis"]) {
            this.setProp("xAxis", value);
        },
        get yAxis() {
            return this.requiredProp("yAxis");
        },
        set yAxis(value: HysteresisLoopPropertySchema["yAxis"]) {
            this.setProp("yAxis", value);
        },
        get name() {
            return this.requiredProp("name");
        },
        set name(value: HysteresisLoopPropertySchema["name"]) {
            this.setProp("name", value);
        },
        get legend() {
            return this.requiredProp("legend");
        },
        set legend(value: HysteresisLoopPropertySchema["legend"]) {
            this.setProp("legend", value);
        },
        get parameters() {
            return this.requiredProp("parameters");
        },
        set parameters(value: HysteresisLoopPropertySchema["parameters"]) {
            this.setProp("parameters", value);
        },
        get xDataArray() {
            return this.requiredProp("xDataArray");
        },
        set xDataArray(value: HysteresisLoopPropertySchema["xDataArray"]) {
            this.setProp("xDataArray", value);
        },
        get yDataSeries() {
            return this.requiredProp("yDataSeries");
        },
        set yDataSeries(value: HysteresisLoopPropertySchema["yDataSeries"]) {
            this.setProp("yDataSeries", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
