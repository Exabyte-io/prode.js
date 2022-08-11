import { expect } from "chai";

import { Pseudopotential } from "../src/include/proto_properties/pseudopotential.js";

const PSEUDO_CONFIGS = [
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
        path: "/export/share/pseudo/si/gga/pbe/vasp/5.2/paw/default/POTCAR",
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

describe("Pseudopotential", () => {
    const pp = new Pseudopotential(PSEUDO_CONFIGS[2]);

    
    it("gets element", () => {
        expect(pp.element).to.be.a("string").that.is.equal("Si");
    });
    
    it("gets basename", () => {
        expect(pp.basename).to.be.a("string").that.is.equal("POTCAR");
    });

    it("gets applications", () => {
        expect(pp.apps).to.be.an("array").that.includes("vasp");
    });

    it("gets path", () => {
        expect(pp.path).to.be.a("string").that.is
            .equal("/export/share/pseudo/si/gga/pbe/vasp/5.2/paw/default/POTCAR");
    });

    it("gets exchangeCorrelation", () => {
        expect(pp.exchangeCorrelation).to.be.an("object").that.has.all.keys("functional", "approximation");
        expect(pp.exchangeCorrelation).to.have.property("functional", "pbe");
        expect(pp.exchangeCorrelation).to.have.property("approximation", "gga");
    });

    it("gets source", () => {
        expect(pp.source).to.be.a("string").that.is.equal("vasp");
    });

    it("gets type", () => {
        expect(pp.type).to.be.a("string").that.is.equal("paw");
    });

    it("gets isCustom", () => {
        expect(pp.isCustom).to.be.a("boolean");
    });
});

describe("Pseudopotentials", () => {
    const pseudos = PSEUDO_CONFIGS.map((p) => new Pseudopotential(p));


    it("are sorted by default pattern: '/gbrv/'", () => {
        const sortedPseudos = Pseudopotential.sortPseudosByPattern(pseudos);
        expect(sortedPseudos[0].source).to.equal("gbrv");
    });
    it("are sorted by default path for VASP version 5.2", () => {
        const sortedPseudos = Pseudopotential.sortByPathVASP(pseudos);
        expect(sortedPseudos[0].source).to.equal("vasp");
    });
});
