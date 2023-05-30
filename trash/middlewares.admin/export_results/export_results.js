const export_results = function () {
  return async function (req, res, next) {
    console.log("export_results");

    for (let i = 0; i < res.locals.cheeses.length; ++i) {
      res.locals.cheeses[i].milk_type_string =
        req.app.locals.dictionary[res.locals.cheeses[i].milk_type];
      res.locals.cheeses[i].product_category_list_string = res.locals.cheeses[
        i
      ].product_category_list
        .map((e) => req.app.locals.dictionary[e])
        .join(" / ");
      res.locals.cheeses[i].maturation_time_string =
        res.locals.cheeses[i].maturation_time_type === "fresh"
          ? "Friss"
          : `${res.locals.cheeses[i].maturation_time_quantity} ${
              req.app.locals.dictionary[
                res.locals.cheeses[i].maturation_time_unit
              ]
            }`;
      res.locals.cheeses[i].maturation_time_days_equal = convert_to_days(
        res.locals.cheeses[i].maturation_time_quantity,
        res.locals.cheeses[i].maturation_time_unit
      );
      if (isNaN(res.locals.cheeses[i].average_score))
        res.locals.cheeses[i].average_score = "";

      res.locals.cheeses[i] = {
        public_id: res.locals.cheeses[i].public_id,
        secret_id: res.locals.cheeses[i].secret_id,
        product_name: res.locals.cheeses[i].product_name,
        factory_name: res.locals.cheeses[i].factory_name,
        milk_type_string: res.locals.cheeses[i].milk_type_string,
        product_category_list_string:
          res.locals.cheeses[i].product_category_list_string,
        maturation_time_string: res.locals.cheeses[i].maturation_time_string,
        maturation_time_days_equal:
          res.locals.cheeses[i].maturation_time_days_equal,
        product_description: res.locals.cheeses[i].product_description,

        average_score: res.locals.cheeses[i].average_score,
        number_of_ratings: res.locals.cheeses[i].number_of_ratings,
        medal: res.locals.cheeses[i].medal,

        zip_string: res.locals.cheeses[i].zip_string,
        city: res.locals.cheeses[i].city,
        county: res.locals.cheeses[i].county,
      };
    }

    let cheeses_fresh = [];
    let cheeses_matured = [];

    for (let cheese of res.locals.cheeses) {
      if (cheese.maturation_time_string === "Friss") {
        cheeses_fresh.push(cheese);
      } else {
        cheeses_matured.push(cheese);
      }
    }

    cheeses_fresh.unshift({
      public_id: "Publikus azonosító",
      secret_id: "Titkos azonosító",
      product_name: "Termék neve",
      factory_name: "Készítő / Sajtműhely neve",
      milk_type_string: "Milyen tejből készült?",
      product_category_list_string: "Termékkategória",
      maturation_time_string: "Érlelési idő",
      maturation_time_days_equal: "Érlelési idő napokban",
      product_description: "Termékleírás",

      average_score: "Átlagpontszám",
      number_of_ratings: "Bírálatok száma",
      medal: "Érem",

      zip_string: "Irányítószám",
      city: "Település",
      county: "Megye",
    });

    cheeses_matured.unshift({
      public_id: "Publikus azonosító",
      secret_id: "Titkos azonosító",
      product_name: "Termék neve",
      factory_name: "Készítő / Sajtműhely neve",
      milk_type_string: "Milyen tejből készült?",
      product_category_list_string: "Termékkategória",
      maturation_time_string: "Érlelési idő",
      maturation_time_days_equal: "Érlelési idő napokban",
      product_description: "Termékleírás",

      average_score: "Átlagpontszám",
      number_of_ratings: "Bírálatok száma",
      medal: "Érem",

      zip_string: "Irányítószám",
      city: "Település",
      county: "Megye",
    });

    //console.log(cheeses_fresh)
    //console.log(cheeses_matured)

    const XLSX = require("xlsx");

    let worksheet_fresh = XLSX.utils.json_to_sheet(cheeses_fresh, {
      header: [
        "public_id",
        "secret_id",
        "product_name",
        "factory_name",
        "milk_type_string",
        "product_category_list_string",
        "maturation_time_string",
        "maturation_time_days_equal",
        "product_description",

        "average_score",
        "number_of_ratings",
        "medal",

        "zip_string",
        "city",
        "county",
      ],
      skipHeader: true,
    });

    let worksheet_matured = XLSX.utils.json_to_sheet(cheeses_matured, {
      header: [
        "public_id",
        "secret_id",
        "product_name",
        "factory_name",
        "milk_type_string",
        "product_category_list_string",
        "maturation_time_string",
        "maturation_time_days_equal",
        "product_description",

        "average_score",
        "number_of_ratings",
        "medal",

        "zip_string",
        "city",
        "county",
      ],
      skipHeader: true,
    });

    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet_fresh, "Friss");
    XLSX.utils.book_append_sheet(workbook, worksheet_matured, "Érlelt");

    //const tempy = await import('tempy')

    //let id_pairs_file_path = tempy.temporaryFile({name: 'azonositoparok.xlsx'});

    //console.log(id_pairs_file_path)

    let xlsx_buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    //XLSX.writeFileAsync(workbook, id_pairs_file_path, (err) => {
    //   return res.download(id_pairs_file_path)
    //} )

    res.writeHead(200, [
      [
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      [
        "Content-Disposition",
        `attachment; filename="eredmenyek_reszletes.xlsx"`,
      ],
    ]);
    //return res.download(id_pairs_file_path)
    return res.end(xlsx_buffer);

    //X*/
    //return res.send('random')

    //////////////////////////////////
    /*console.log(res.locals.cheeses)

        const Cheese_Model = require('../../config/db').mongoose.connection.db.collection('k2')

        let cheeses_mat = await Cheese_Model.find(
            {
                maturation_time_type: "matured"
            },
        )
            .project
            ({
                _id: 0,

                public_id: 1,
                secret_id: 1,
                product_name: 1,
                factory_name: 1,
                maturation_time_type: 1,
                numberofratings: 1,
                averagescore: 1,
                aranyezustbronz: {
                    $cond: {
                        if: { $and: [{ $gte: ["$averagescore", 94.5] }, { $lte: ["$averagescore", 100] }] },
                        then: "A",
                        else: {
                            $cond: {
                                if: { $and: [{ $lt: ["$averagescore", 94.5] }, { $gte: ["$averagescore", 84.5] }] },
                                then: "E",
                                else: {
                                    $cond: {
                                        if: { $and: [{ $gte: ["$averagescore", 84.5] }, { $lt: ["$averagescore", 89.5] }] },
                                        then: "B",
                                        else: "",
                                    },
                                },
                            },
                        }
                    },
                }

            })
            .toArray()

        let cheeses_fresh = await Cheese_Model.find(
            {
                maturation_time_type: "fresh"
            },
        )
            .project
            ({
                _id: 0,

                public_id: 1,
                secret_id: 1,
                product_name: 1,
                factory_name: 1,
                maturation_time_type: 1,
                numberofratings: 1,
                averagescore: 1,
                aranyezustbronz: {
                    $cond: {
                        if: { $and: [{ $gte: ["$averagescore", 94.5] }, { $lte: ["$averagescore", 100] }] },
                        then: "A",
                        else: {
                            $cond: {
                                if: { $and: [{ $lt: ["$averagescore", 94.5] }, { $gte: ["$averagescore", 84.5] }] },
                                then: "E",
                                else: {
                                    $cond: {
                                        if: { $and: [{ $gte: ["$averagescore", 84.5] }, { $lt: ["$averagescore", 89.5] }] },
                                        then: "B",
                                        else: "",
                                    },
                                },
                            },
                        }
                    },
                }

            })
            .toArray()

        cheeses_fresh.unshift({ public_id: 'Publikus', secret_id: 'Titkos', product_name: 'Termék neve', factory_name: 'Készítő neve', maturation_time_type: 'Friss vagy érlelt', numberofratings: 'Bírálatok száma', averagescore: 'Átlagpontszám', aranyezustbronz: 'Arany, ezüst, bronz' })
        cheeses_mat.unshift({ public_id: 'Publikus', secret_id: 'Titkos', product_name: 'Termék neve', factory_name: 'Készítő neve', maturation_time_type: 'Friss vagy érlelt', numberofratings: 'Bírálatok száma', averagescore: 'Átlagpontszám', aranyezustbronz: 'Arany, ezüst, bronz' })

        const XLSX = require("xlsx")


        let worksheet_fresh = XLSX.utils.json_to_sheet(cheeses_fresh, { header: ["public_id", "secret_id", "product_name", "factory_name", "maturation_time_type", "numberofratings", "averagescore", "aranyezustbronz"], skipHeader: true })
        let worksheet_mat = XLSX.utils.json_to_sheet(cheeses_mat, { header: ["public_id", "secret_id", "product_name", "factory_name", "maturation_time_type", "numberofratings", "averagescore", "aranyezustbronz"], skipHeader: true })

        let workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet_fresh, "Fresh")
        XLSX.utils.book_append_sheet(workbook, worksheet_mat, "Matured")

        //const tempy = await import('tempy')

        //let id_pairs_file_path = tempy.temporaryFile({name: 'azonositoparok.xlsx'});

        //console.log(id_pairs_file_path)

        let xlsx_buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
        //XLSX.writeFileAsync(workbook, id_pairs_file_path, (err) => {
        //   return res.download(id_pairs_file_path)
        //} )

        res.writeHead(
            200,
            [
                ['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
                ['Content-Disposition', `attachment; filename="export_results.xlsx"`]
            ]
        )
        //return res.download(id_pairs_file_path)
        return res.end(xlsx_buffer)
        //X
        */
  };

  function convert_to_days(quantity, unit) {
    if (unit === "day") return quantity;
    if (unit === "week") return quantity * 7;
    if (unit === "month") return quantity * 30;
    return 0;
  }
};

module.exports = export_results;
