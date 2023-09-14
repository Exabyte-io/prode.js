import { expect } from "chai";

import { Pseudopotential } from "../src/include/meta_properties/pseudopotential";

const PSEUDO_CONFIGS = [
    {
        element: "Si",
        hash: "031e731297e9d8d5caaeaacb5bb524fa",
        filename: "si_pbe_dojo-oncv_0.4.upf",
        path: "/export/share/pseudo/si/gga/pbe/dojo-oncv/0.4/nc/si_pbe_dojo-oncv_0.4.upf",
        apps: ["espresso"],
        exchangeCorrelation: {
            functional: "pbe",
            approximation: "gga",
        },
        name: "pseudopotential",
        source: "dojo-oncv",
        type: "nc",
        version: "0.4",
    },
    {
        element: "Si",
        hash: "9d3353ad597f4669d598900a4a25d674",
        filename: "si_pbe_gbrv_1.0.upf",
        path: "/export/share/pseudo/si/gga/pbe/gbrv/1.0/us/si_pbe_gbrv_1.0.upf",
        apps: ["espresso"],
        exchangeCorrelation: {
            functional: "pbe",
            approximation: "gga",
        },
        name: "pseudopotential",
        source: "gbrv",
        type: "us",
        version: "1.0",
    },
    {
        element: "Si",
        hash: "eb5cf1f3d2ace01b2b16e15c7cdbbb22",
        filename: "POTCAR",
        path: "/export/share/pseudo/si/gga/pbe/vasp/5.2/paw/default/POTCAR",
        apps: ["vasp"],
        exchangeCorrelation: {
            functional: "pbe",
            approximation: "gga",
        },
        name: "pseudopotential",
        source: "vasp",
        type: "paw",
        version: "5.2",
    },
    {
        element: "Pb",
        hash: "c464c3afe3f71cdb0fa2da3dd0badea4",
        filename: "pb_pz_gbrv_1.0.upf",
        path: "/export/share/pseudo/pb/lda/pz/gbrv/1.0/us/pb_pz_gbrv_1.0.upf",
        apps: ["espresso"],
        exchangeCorrelation: {
            functional: "pz",
            approximation: "lda",
        },
        name: "pseudopotential",
        source: "gbrv",
        type: "us",
        version: "1.0",
    },
];

describe("Pseudopotential", () => {
    const pp = new Pseudopotential(PSEUDO_CONFIGS[2]);

    it("gets element", () => {
        expect(pp.element).to.be.a("string").that.is.equal("Si");
    });

    it("gets filename", () => {
        expect(pp.filename).to.be.a("string").that.is.equal("POTCAR");
    });

    it("gets applications", () => {
        expect(pp.apps).to.be.an("array").that.includes("vasp");
    });

    it("gets path", () => {
        expect(pp.path)
            .to.be.a("string")
            .that.is.equal("/export/share/pseudo/si/gga/pbe/vasp/5.2/paw/default/POTCAR");
    });

    it("gets exchangeCorrelation", () => {
        expect(pp.exchangeCorrelation)
            .to.be.an("object")
            .that.has.all.keys("functional", "approximation");
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
    const filterObj = {
        exchangeCorrelation: {
            functional: "pbe",
            approximation: "gga",
        },
        searchText: "gbrv",
    };
    const filterObj2 = {
        appName: "espresso",
        elements: ["Pb"],
    };

    it("can be sorted by default pattern: '/gbrv/'", () => {
        const sortedPseudos = Pseudopotential.sortPseudosByPattern(pseudos);
        expect(sortedPseudos[0].source).to.equal("gbrv");
    });
    it("can be sorted by default path for VASP version 5.2", () => {
        const sortedPseudos = Pseudopotential.sortByPathVASP(pseudos);
        expect(sortedPseudos[0].source).to.equal("vasp");
    });
    it("can be filtered by exchangeCorrelation and searchText at once", () => {
        const { functional: func, approximation: appr } = filterObj.exchangeCorrelation;
        const filtered = Pseudopotential.applyPseudoFilters(pseudos, filterObj);
        // may need to be adjusted when new pseudos array is modified!
        expect(filtered).to.have.lengthOf(1);
        expect(filtered[0].exchangeCorrelation).to.have.property("functional", func);
        expect(filtered[0].exchangeCorrelation).to.have.property("approximation", appr);
        expect(filtered[0].source).to.be.equal(filterObj.searchText);
    });
    it("can be filtered by appName and elements at once", () => {
        const filtered = Pseudopotential.applyPseudoFilters(pseudos, filterObj2);
        // may need to be adjusted when new pseudos array is modified!
        expect(filtered).to.have.lengthOf(1);
        expect(filtered[0].apps[0]).to.be.equal(filterObj2.appName);
        expect(filtered[0].element).to.be.equal(filterObj2.elements[0]);
    });
    it("can be filtered by compatible functionals", () => {
        const exchangeCorrelation = { approximation: "hybrid", functional: "hse06" };
        const sortedPseudos = Pseudopotential.filterRawDataByExchangeCorrelation(
            pseudos,
            exchangeCorrelation,
        );
        expect(sortedPseudos).to.have.length(3); // there are 3 PBE pseudos above
        expect(sortedPseudos.map((p) => p.exchangeCorrelation.functional)).to.include("pbe");
    });
    it("can be filtered by pseudopotential type", () => {
        const filtered = Pseudopotential.filterByType(pseudos, "paw");
        const filteredWithObject = Pseudopotential.applyPseudoFilters(pseudos, { type: "paw" });
        // may need to be adjusted when new pseudos array is modified!
        expect(filtered).to.have.lengthOf(1);
        expect(filtered[0].type).to.be.equal("paw");
        expect(filtered[0].path).to.be.equal(
            "/export/share/pseudo/si/gga/pbe/vasp/5.2/paw/default/POTCAR",
        );
        expect(filteredWithObject).to.have.deep.members(filtered);
    });
});
