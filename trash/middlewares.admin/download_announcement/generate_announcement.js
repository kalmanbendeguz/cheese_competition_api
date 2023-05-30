const generate_announcement = function () {
  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    console.log("generate_announcement");

    const PizZip = require("pizzip");
    const Docxtemplater = require("docxtemplater");

    const fs = require("fs");
    const path = require("path");

    //let receipt_parameters = {}

    const competition_name = (
      await Key_Value_Model.findOne({ key: "competition_name" })
    ).value;
    //receipt_parameters.competition_location = (await Key_Value_Model.findOne({key: 'competition_location'})).value

    // Load the docx file as binary content
    const content = fs.readFileSync("src/static/announcement.docx", "binary");

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      competition_name: competition_name,
      results_by_categories: res.locals.results_by_categories,
    });

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const tempy = await import("tempy");

    let announcement_file_path_docx = tempy.temporaryFile({
      name: `eredmenyhirdetes.docx`,
    }); //talán ide datum majd a file nevbe

    fs.writeFileSync(announcement_file_path_docx, buf);

    return res.download(announcement_file_path_docx);
  };
};

module.exports = generate_announcement;
