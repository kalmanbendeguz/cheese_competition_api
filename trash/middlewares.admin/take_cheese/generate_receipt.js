const generate_receipt = function () {
  const Key_Value_Model = require("../../models/Key_Value");

  return async function (req, res, next) {
    console.log("generate_receipt");

    const PizZip = require("pizzip");
    const Docxtemplater = require("docxtemplater");
    const fs = require("fs").promises;

    let receipt_parameters = {};
    receipt_parameters.competition_name = (
      await Key_Value_Model.findOne({ key: "competition_name" })
    ).value;
    receipt_parameters.competition_location = (
      await Key_Value_Model.findOne({ key: "competition_location" })
    ).value;

    const content = await fs.readFile(
      "src/static/atveteli_elismerveny.docx",
      "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const now = new Date();
    const year = now.getFullYear();
    const month =
      now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
    const day = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    await doc.renderAsync({
      public_id: res.locals.cheese.public_id,
      product_name: res.locals.cheese.product_name,
      manufacturer_name: res.locals.receipt_user.full_name,
      factory_name: res.locals.cheese.factory_name,
      date: `${year}.${month}.${day}.`,
      competition_name: receipt_parameters.competition_name,
      competition_location: receipt_parameters.competition_location,
    });

    const docx_buffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    res.writeHead(200, [
      [
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      [
        "Content-Disposition",
        `attachment; filename="atveteli_elismerveny_${req.query.public_id}.docx"`,
      ],
    ]);

    return res.end(docx_buffer);
  };
};

module.exports = generate_receipt;
