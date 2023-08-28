const schema_options = {
    minimize: false,
    strict: true,
    strictQuery: false,
    validateBeforeSave: true,
}

const model_schema_options = {
    ...schema_options,
    timestamps: true,
}

const _export = {
    schema_options,
    model_schema_options
}

module.exports = _export