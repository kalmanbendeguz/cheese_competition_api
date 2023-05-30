const export_id_pairs = function () {
  return async function (req, res, next) {
    console.log("export_id_pairs");

    const Cheese_Model =
      require("../../config/db").mongoose.connection.db.collection("cheeses");

    let cheeses = await Cheese_Model.find({})
      .project({
        _id: 0,
        public_id: 1,
        secret_id: 1,
      })
      .toArray();

    cheeses.unshift({ public_id: "Publikus", secret_id: "Titkos" });

    const XLSX = require("xlsx");

    let worksheet = XLSX.utils.json_to_sheet(cheeses, {
      header: ["public_id", "secret_id"],
      skipHeader: true,
    });

    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Azonosítópárok");

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
      ["Content-Disposition", `attachment; filename="azonositoparok.xlsx"`],
    ]);
    //return res.download(id_pairs_file_path)
    return res.end(xlsx_buffer);
    //X
  };
};

module.exports = export_id_pairs;
