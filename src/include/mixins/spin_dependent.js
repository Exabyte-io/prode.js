export const SpinDependentMixin = (superclass) =>
    class extends superclass {
        get spin() {
            return this.prop("spin");
        }
    };
