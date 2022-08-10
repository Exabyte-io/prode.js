import { expect } from "chai";

import { Pseudopotential } from "../src/include/proto_properties/pseudopotential.js";

describe("Pseudopotentials", () => {
    const pseudoConfigs = [
        {
            element: "Si",
            hash: "031e731297e9d8d5caaeaacb5bb524fa",
            filename: "si_pbe_dojo-oncv_0.4.upf",
            path: "/export/share/pseudo/si/gga/pbe/dojo-oncv/0.4/nc/si_pbe_dojo-oncv_0.4.upf",
            apps: ["espresso"],
            exchangeCorrelation: {
                functional: "pbe",
                approximation: "gga"
            },
            name: "pseudopotential",
            source: "dojo-oncv",
            type: "nc",
            version: "0.4"
        },
        {
            element: "Si",
            hash: "9d3353ad597f4669d598900a4a25d674",
            filename: "si_pbe_gbrv_1.0.upf",
            path: "/export/share/pseudo/si/gga/pbe/gbrv/1.0/us/si_pbe_gbrv_1.0.upf",
            apps: ["espresso"],
            exchangeCorrelation: {
                functional: "pbe",
                approximation: "gga"
            },
            name: "pseudopotential",
            source: "gbrv",
            type: "us",
            version: "1.0"
        },
        {
            element: "Si",
            hash: "eb5cf1f3d2ace01b2b16e15c7cdbbb22",
            filename: "POTCAR",
            path: "/export/share/pseudo/si/gga/pbe/vasp/5.2/paw/sv/GW/POTCAR",
            apps: ["vasp"],
            exchangeCorrelation: {
                functional: "pbe",
                approximation: "gga"
            },
            name: "pseudopotential",
            source: "vasp",
            type: "paw",
            version: "5.2"
        }
    ];
    const pseudos = pseudoConfigs.map((p) => new Pseudopotential(p));


    it("are sorted by default pattern: '/gbrv/'", () => {
        const sortedPseudos = Pseudopotential.sortPseudosByPattern(pseudos);
        expect(sortedPseudos[0].source).to.equal("gbrv");
    });
});
