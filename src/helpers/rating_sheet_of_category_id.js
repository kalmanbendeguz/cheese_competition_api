//rating_sheet_of_category_id(
//        product_of_rating.product_category_id
//    )

const rating_sheet_of_category_id = (product_category_id) => {
    return [
        {
            "title": "kulso",
            "score": 20,
            "blocks": [
                [
                    "peneszes",
                    "szennyezett",
                    "foltos",
                    "szinhianyos",
                    "eltero_szinu",
                    "repedezett"
                ],
                ["kisse_foltos", "kisse_eltero", "kisse_gyurodott_felulet"],
                [
                    "egyenletes_szinu",
                    "sajtkendo_sajtforma_mintaja",
                    "halvanyan_latszik",
                    "gyurodesmentes",
                    "felulete_zart",
                    "kereg_nelkuli"
                ]
            ]
        },
        {
            "title": "belso_szin_es_allomany",
            "score": 20,
            "blocks": [
                [
                    "erosen_pepes",
                    "morzsalodo",
                    "foltos",
                    "elszinezodott",
                    "savoereszto",
                    "eltero_szinu"
                ],
                [
                    "kisse_pepes",
                    "daras_morzsalodo",
                    "ragos",
                    "kisse_szaraz_fojtos",
                    "gyengen_savoereszto"
                ],
                [
                    "laza_rogokben_osszeallo",
                    "egynemu",
                    "nem_savo_ereszto",
                    "szajban_konnyen_elomlo"
                ]
            ]
        },
        {
            "title": "illat",
            "score": 20,
            "blocks": [
                ["erosen_elesztos", "erosen_savanyu", "fulledt", "szaghibas"],
                [
                    "kevesbe_jellegzetes",
                    "enyhen_elesztos",
                    "gyenge_idegen_szag",
                    "kisse_ures"
                ],
                [
                    "jellegzetesen_tiszta",
                    "illata_karakteres",
                    "kellemesen_savanykas",
                    "tiszta_tejes_illat"
                ]
            ]
        },
        {
            "title": "iz",
            "score": 40,
            "blocks": [
                [
                    "erjedt",
                    "peneszes",
                    "fanyar",
                    "ecetesen_savanyu",
                    "ecetesen_savanyu",
                    "erosen_kesernyes_iz"
                ],
                [
                    "enyhen_savanyu",
                    "kisse_ures_de_tiszta_izu",
                    "kevesbe_zamatos",
                    "enyhen_kesernyes"
                ],
                [
                    "jellegzetesen_tiszta",
                    "aromas_zamatos",
                    "kellemesen_savanykas",
                    "enyhen_sos"
                ]
            ]
        }
    ]
}

module.exports = rating_sheet_of_category_id