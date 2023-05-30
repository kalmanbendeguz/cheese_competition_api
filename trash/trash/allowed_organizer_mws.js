Allowed_Organizer_Schema.pre(
  "save",
  { document: true, query: true }, // query true???
  async function (next) {
    try {
      console.log(`Allowed_Organizer_Schema.pre('save')`);
      const validator = require("../validators/schemas/Allowed_Organizer");

      const value = await validator.validateAsync(this);

      // HOW DO WE HANDLE VALIDATION ERROR?
      console.log("---");
      console.log(value);
      console.log("---");
      return next();
    } catch (error) {
      console.log("CATCHED ERROR");
      return next(error);
    }
  }
);

Allowed_Organizer_Schema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log(`Allowed_Organizer_Schema.pre('deleteOne')`);
      const User_Model = require("./User");
      //console.log(this)

      await User_Model.deleteOne({
        email: this.email,
        roles: { $elemMatch: { $eq: "organizer" } },
        roles: { $size: 1 },
      });

      await User_Model.updateOne(
        {
          email: this.email,
          roles: { $in: ["organizer"] },
        },
        {
          $pull: { roles: "organizer" },
        }
      );

      return next();
    } catch (error) {
      return next(error);
    }
  }
);
