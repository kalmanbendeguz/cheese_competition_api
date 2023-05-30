Product_Schema.pre("validate", async function () {
  console.log(`pre('validate')`);
  if (!this.competition_id) {
    // nem így kéne ellenőrizni, hanem hogy jelen van-e a field. (?)
    this.competition_id = (
      await mongoose
        .model("Competition")
        .findOne({ archived: false }, { _id: 1 })
    ).id;
  }
  if (!this.public_id) {
    // nem így kéne ellenőrizni, hanem hogy jelen van-e a field. (?)
    const randomstring = require("randomstring");
    const forbidden_id_parts = require("../static/forbidden_id_parts");

    let public_id;
    let letters;
    let numbers;
    do {
      letters = randomstring.generate({
        length: 3,
        charset: "alphabetic",
        capitalization: "uppercase",
      });
      numbers = randomstring.generate({
        length: 3,
        charset: "numeric",
      });
      public_id = `${letters}${numbers}`;
    } while (
      forbidden_id_parts.includes(letters) ||
      (await mongoose.model("Product").exists({ public_id: public_id })) ||
      (await mongoose.model("Product").exists({ secret_id: public_id }))
    );
    console.log(`PUBLIC ${public_id}`);
    this.public_id = public_id;
  }
  if (!this.secret_id) {
    // nem így kéne ellenőrizni, hanem hogy jelen van-e a field. (?)
    const randomstring = require("randomstring");
    const forbidden_id_parts = require("../static/forbidden_id_parts");

    let secret_id;
    let letters;
    let numbers;
    do {
      letters = randomstring.generate({
        length: 3,
        charset: "alphabetic",
        capitalization: "uppercase",
      });
      numbers = randomstring.generate({
        length: 3,
        charset: "numeric",
      });
      secret_id = `${letters}${numbers}`;
    } while (
      forbidden_id_parts.includes(letters) ||
      (await mongoose.model("Product").exists({ public_id: secret_id })) ||
      (await mongoose.model("Product").exists({ secret_id: secret_id }))
    );
    console.log(`SECRET ${secret_id}`);
    this.secret_id = secret_id;
  }
});

Product_Schema.pre("save", async () => {
  // ezt jobban átnézni, hogy milyen opciók vannak hozzá!
  console.log(`pre('save')`);
});

Product_Schema.pre("remove", { document: true }, async function (next) {
  console.log(`pre('remove')`);
  try {
    const Rating_Model = require("./Rating");
    await Rating_Model.deleteMany({ product_id: this._id });
    next();
  } catch (error) {
    next(error);
  }
});
