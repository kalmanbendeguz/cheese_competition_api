Key_Value_Schema.pre("save", { document: true }, async function (next) {
  try {
    console.log(`Key_Value_Schema.pre('save')`);
    const validator = require("../validators/schemas/Key_Value");

    const value = await validator.validateAsync(this);

    // HOW DO WE HANDLE VALIDATION ERROR?
    console.log("---");
    console.log(value);
    console.log("---");
    next();
  } catch (error) {
    console.log("CATCHED ERROR");
    next(error);
  }
});
