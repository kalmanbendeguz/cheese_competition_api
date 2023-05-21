const generate_pos_transaction_id = async () => {
    let pos_transaction_id
    do {
        pos_transaction_id = randomstring.generate({
            length: 32,
            charset: alphanumeric,
            capitalization: lowercase
        })
    } while (
        await Entry_Fee_Payment_Model.exists({ pos_transaction_id: pos_transaction_id })
    )
    return pos_transaction_id
}

const generate_confirm_payment_id = async () => {
    let confirm_payment_id
    do {
        confirm_payment_id = randomstring.generate({
            length: 32,
            charset: alphanumeric,
            capitalization: lowercase
        })
    } while (
        await Entry_Fee_Payment_Model.exists({ confirm_payment_id: confirm_payment_id })
    )
    return confirm_payment_id
}