const cheeses_export_cheese_numbers_by_counties_table = function () {
  return async function (req, res, next) {
    console.log("cheeses_export_cheese_numbers_by_counties_table");

    const counties_by_zip = require("../../static/counties_by_zip");

    let counties = [];

    for (let cheese of res.locals.cheeses) {
      let county_of_cheese = counties_by_zip[cheese.user.billing_zip];
      let index_of_county = counties.findIndex(
        (c) => c.county === county_of_cheese
      );
      if (index_of_county !== -1) {
        counties[index_of_county].cheese_number += 1;
      } else {
        counties.push({ county: county_of_cheese, cheese_number: 1 });
      }
    }

    counties.sort((a, b) => a.county.localeCompare(b.county));
    //console.log(counties)

    counties.unshift({
      county: "Megye",
      cheese_number: "Nevezett termékek száma",
    });

    const XLSX = require("xlsx");

    let worksheet = XLSX.utils.json_to_sheet(counties, {
      header: ["county", "cheese_number"],
      skipHeader: true,
    });

    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "termekek_megyenkent");

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
        `attachment; filename="termekek_megyenkent.xlsx"`,
      ],
    ]);
    //return res.download(id_pairs_file_path)
    return res.end(xlsx_buffer);
  };
};

module.exports = cheeses_export_cheese_numbers_by_counties_table;
