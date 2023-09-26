approved: Joi.boolean().required(),

  
approval_type: Joi.when('approved', {
    is: true,
    then: Joi.string()
        .trim()
        .required()
        .valid('payment', 'association_member', 'bypass')
        .prefs({ convert: false }),
    otherwise: Joi.forbidden(),
}),
handed_in: Joi.boolean().when('approved', {
    is: false,
    then: Joi.valid(false),
}).required(),