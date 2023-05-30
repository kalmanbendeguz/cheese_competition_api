const export_results_by_counties_table = function () {
  return async function (req, res, next) {
    console.log("export_results_by_counties_table");

    const counties_by_zip = require("../../static/counties_by_zip");

    let counties = [];
    let scores_in_counties = [];

    for (let cheese of res.locals.cheeses) {
      let county_of_cheese = counties_by_zip[cheese.user.billing_zip];
      let index_of_county = counties.findIndex(
        (c) => c.county === county_of_cheese
      );

      let num_of_medals = cheese.medal === "-" ? 0 : 1;
      let num_of_golds = cheese.medal === "ARANY" ? 1 : 0;
      let num_of_silvers = cheese.medal === "EZÜST" ? 1 : 0;
      let num_of_bronzes = cheese.medal === "BRONZ" ? 1 : 0;

      if (index_of_county !== -1) {
        counties[index_of_county].cheese_number += 1;
        counties[index_of_county].number_of_medals += num_of_medals;
        counties[index_of_county].number_of_golds += num_of_golds;
        counties[index_of_county].number_of_silvers += num_of_silvers;
        counties[index_of_county].number_of_bronzes += num_of_bronzes;

        scores_in_counties[index_of_county].cheese_number += 1;

        //console.log(counties[index_of_county].rated_average_score_in_county)

        if (!isNaN(cheese.average_score)) {
          scores_in_counties[index_of_county].sum_of_scores +=
            cheese.average_score;
        }

        if (cheese.number_of_ratings > 0) {
          scores_in_counties[index_of_county].rated_cheese_number += 1;
          //console.log(scores_in_counties[index_of_county].rated_cheese_number)
          counties[index_of_county].rated_cheese_number += 1;
          //console.log(counties[index_of_county].rated_cheese_number)
          counties[index_of_county].rated_average_score_in_county =
            scores_in_counties[index_of_county].sum_of_scores /
            scores_in_counties[index_of_county].rated_cheese_number;
          //console.log(counties[index_of_county].rated_average_score_in_county)
          //console.log('itt')
        }

        counties[index_of_county].average_score_in_county =
          scores_in_counties[index_of_county].sum_of_scores /
          scores_in_counties[index_of_county].cheese_number;

        scores_in_counties[index_of_county].rated_average_score_in_county =
          scores_in_counties[index_of_county].sum_of_scores /
          scores_in_counties[index_of_county].rated_cheese_number;
      } else {
        if (!isNaN(cheese.average_score)) {
          scores_in_counties.push({
            county: county_of_cheese,
            cheese_number: 1,
            rated_cheese_number: 1,
            sum_of_scores: cheese.average_score,
          });
          counties.push({
            county: county_of_cheese,
            cheese_number: 1,
            rated_cheese_number: 1,
            number_of_medals: num_of_medals,
            number_of_golds: num_of_golds,
            number_of_silvers: num_of_silvers,
            number_of_bronzes: num_of_bronzes,
            average_score_in_county: cheese.average_score,
            rated_average_score_in_county: cheese.average_score,
          });
        } else {
          scores_in_counties.push({
            county: county_of_cheese,
            cheese_number: 1,
            rated_cheese_number: 0,
            sum_of_scores: 0,
          });
          counties.push({
            county: county_of_cheese,
            cheese_number: 1,
            rated_cheese_number: 0,
            number_of_medals: num_of_medals,
            number_of_golds: num_of_golds,
            number_of_silvers: num_of_silvers,
            number_of_bronzes: num_of_bronzes,
            average_score_in_county: 0,
            rated_average_score_in_county: 0,
          });
        }
      }
    }

    //console.log(counties)
    counties.sort((a, b) => a.county.localeCompare(b.county));
    scores_in_counties.sort((a, b) => a.county.localeCompare(b.county));

    //console.log(res.locals.cheeses)
    //console.log(counties)

    counties.unshift({
      county: "Megye",
      cheese_number: "Nevezett termékek száma",
      rated_cheese_number: "Bírált termékek száma",
      number_of_medals: "Érmesek száma",
      number_of_golds: "Arany",
      number_of_silvers: "Ezüst",
      number_of_bronzes: "Bronz",
      average_score_in_county: "Átlagpontszám a megyében",
      rated_average_score_in_county:
        "Bírált termékek átlagpontszáma a megyében",
    });

    const XLSX = require("xlsx");

    let worksheet = XLSX.utils.json_to_sheet(counties, {
      header: [
        "county",
        "cheese_number",
        "rated_cheese_number",
        "number_of_medals",
        "number_of_golds",
        "number_of_silvers",
        "number_of_bronzes",
        "average_score_in_county",
        "rated_average_score_in_county",
      ],
      skipHeader: true,
    });

    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "eredmenyek_megyenkent");

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
        `attachment; filename="eredmenyek_megyenkent.xlsx"`,
      ],
    ]);
    //return res.download(id_pairs_file_path)
    return res.end(xlsx_buffer);
  };
};

module.exports = export_results_by_counties_table;
