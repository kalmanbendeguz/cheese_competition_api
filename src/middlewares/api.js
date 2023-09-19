const create = (require('../../../middlewares/api')).product.create

router.post('/', create)


const api = (validator, transaction) => async (req, res, next) => {
    const validated_request = await validator(req)
    const transaction_result = transaction(validated_request)
    return res.status(transaction_result.code).json(transaction_result.data)
}

module.exports[post_product] = api()