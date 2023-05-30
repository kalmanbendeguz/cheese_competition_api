const { Schema } = require("mongoose");

const Rating_Aspect_Schema = new Schema(
  {
    title: {
      type: String,
    },
    score: {
      type: Number,
    },
    blocks: {
      type: [
        {
          type: [
            {
              type: String,
            },
          ],
        },
      ],
    },
    comment: {
      type: String,
    },
  },
  {
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true,
  }
);

// DOCUMENT MIDDLEWARES
Rating_Aspect_Schema.pre(
  "validate",
  { document: true, query: false },
  function (next) {
    console.log(
      `D_Rating_Aspect_Schema.pre('validate') { document: true, query: false }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "validate",
  { document: true, query: false },
  function (doc) {
    console.log(
      `D_Rating_Aspect_Schema.post('validate') { document: true, query: false }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "save",
  { document: true, query: false },
  function (next) {
    console.log(
      `D_Rating_Aspect_Schema.pre('save') { document: true, query: false }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "save",
  { document: true, query: false },
  function (doc) {
    console.log(
      `D_Rating_Aspect_Schema.post('save') { document: true, query: false }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "remove",
  { document: true, query: false },
  function (next) {
    console.log(
      `D_Rating_Aspect_Schema.pre('remove') { document: true, query: false }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "remove",
  { document: true, query: false },
  function (doc) {
    console.log(
      `D_Rating_Aspect_Schema.post('remove') { document: true, query: false }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "updateOne",
  { document: true, query: false },
  function (next) {
    console.log(
      `D_Rating_Aspect_Schema.pre('updateOne') { document: true, query: false }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "updateOne",
  { document: true, query: false },
  function (doc) {
    console.log(
      `D_Rating_Aspect_Schema.post('updateOne') { document: true, query: false }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "deleteOne",
  { document: true, query: false },
  function (next) {
    console.log(
      `D_Rating_Aspect_Schema.pre('deleteOne') { document: true, query: false }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "deleteOne",
  { document: true, query: false },
  function (doc) {
    console.log(
      `D_Rating_Aspect_Schema.post('deleteOne') { document: true, query: false }`
    );
  }
);
Rating_Aspect_Schema.pre("init", function (doc) {
  console.log(`D_Rating_Aspect_Schema.pre('init')`);
});
Rating_Aspect_Schema.post("init", function (doc) {
  console.log(`D_Rating_Aspect_Schema.post('init')`);
});

// QUERY MIDDLEWARES
Rating_Aspect_Schema.pre(
  "count",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('count' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "count",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('count' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "countDocuments",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('countDocuments' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "countDocuments",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('countDocuments' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "deleteMany",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('deleteMany' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "deleteMany",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('deleteMany' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "deleteOne",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('deleteOne' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "deleteOne",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('deleteOne' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "estimatedDocumentCount",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('estimatedDocumentCount' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "estimatedDocumentCount",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('estimatedDocumentCount' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "find",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('find' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "find",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('find' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "findOne",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('findOne' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "findOne",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('findOne' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('findOneAndDelete' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "findOneAndDelete",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('findOneAndDelete' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "findOneAndRemove",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('findOneAndRemove' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "findOneAndRemove",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('findOneAndRemove' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "findOneAndReplace",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('findOneAndReplace' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "findOneAndReplace",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('findOneAndReplace' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "findOneAndUpdate",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('findOneAndUpdate' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "findOneAndUpdate",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('findOneAndUpdate' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "remove",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('remove' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "remove",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('remove' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "replaceOne",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('replaceOne' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "replaceOne",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('replaceOne' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "update",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('update' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "update",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('update' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "updateOne",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('updateOne' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "updateOne",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('updateOne' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "updateMany",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('updateMany' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "updateMany",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('updateMany' { document: false, query: true }`
    );
  }
);
Rating_Aspect_Schema.pre(
  "validate",
  { document: false, query: true },
  function (next) {
    console.log(
      `Q_Rating_Aspect_Schema.pre('validate' { document: false, query: true }`
    );
    return next();
  }
);
Rating_Aspect_Schema.post(
  "validate",
  { document: false, query: true },
  function (doc) {
    console.log(
      `Q_Rating_Aspect_Schema.post('validate' { document: false, query: true }`
    );
  }
);

// AGGREGATE MIDDLEWARES
Rating_Aspect_Schema.pre("aggregate", function (next) {
  console.log(`A_Rating_Aspect_Schema.pre('aggregate')`);
  return next();
});
Rating_Aspect_Schema.post("aggregate", function (doc) {
  console.log(`A_Rating_Aspect_Schema.post('aggregate')`);
});

// MODEL MIDDLEWARES
Rating_Aspect_Schema.pre("insertMany", function (next) {
  console.log(`M_Rating_Aspect_Schema.pre('insertMany')`);
  return next();
});
Rating_Aspect_Schema.post("insertMany", function (doc) {
  console.log(`M_Rating_Aspect_Schema.post('insertMany')`);
});

module.exports = Rating_Aspect_Schema;
