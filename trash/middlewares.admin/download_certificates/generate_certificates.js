const generate_certificates = function () {
  return async function (req, res, next) {
    console.log("generate_certificates");

    const User_Model =
      require("../../config/db").mongoose.connection.db.collection("users");

    const PizZip = require("pizzip");
    const Docxtemplater = require("docxtemplater");
    const fs = require("fs");
    const archiver = require("archiver");
    const tempy = await import("tempy");

    let certificate_zip_file_path = tempy.temporaryFile({
      name: `oklevelek.zip`,
    });

    const content = fs.readFileSync("src/static/oklevel.docx", "binary");

    let output = fs.createWriteStream(certificate_zip_file_path);

    let archive = archiver("zip", {
      gzip: true,
      zlib: { level: 9 },
    });

    archive.on("error", function (err) {
      throw err;
    });

    output.on("close", function () {
      return res.download(certificate_zip_file_path);
    });

    archive.pipe(output);

    for await (let cheese of res.locals.cheeses) {
      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      let manufacturer = await User_Model.findOne({ _id: cheese.manufacturer });

      let qualification = "-";

      if (cheese.average_score <= 100 && cheese.average_score >= 94.5) {
        qualification = "ARANY";
      } else if (cheese.average_score < 94.5 && cheese.average_score >= 89.5) {
        qualification = "EZÜST";
      } else if (cheese.average_score < 89.5 && cheese.average_score >= 84.5) {
        qualification = "BRONZ";
      }

      doc.render({
        manufacturer_name: cheese.factory_name, // JAVÍTVA? ELLENŐRIZNI
        product_name: cheese.product_name,
        average_score: Math.round(cheese.average_score),
        qualification: qualification,
      });

      let buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });

      let certificate_file_path = tempy.temporaryFile({
        name: `oklevel_${cheese.public_id}.docx`,
      });

      fs.writeFileSync(certificate_file_path, buf);

      archive.file(certificate_file_path, {
        name: `oklevel_${cheese.public_id}.docx`,
      });
    }

    await archive.finalize();
  };
};

module.exports = generate_certificates;
