const create = async (body, user, parent_session) => {

    // 1. Validate body
    const create_competition_validator = require('../../../validators/requests/api/competition/create')
    try {
        await create_competition_validator.validateAsync(body)
    } catch (err) {
        return { code: 400, data: err.details }
    }

    // 2. Arrayize
    body = Array.isArray(body) ? body : [body]

    // 3. Authorize create
    const authorizer = require('../../../authorizers/entities/competition')
    try {
        body = body.map((competition) => authorizer(competition, 'create', user))
    } catch (reason) {
        return {
            code: 403,
            data: reason
        }
    }

    // 4. Start session and transaction if they don't exist
    const Competition_Model = require('../../../models/Competition')
    const session = parent_session ?? await Competition_Model.startSession()
    if (!session.inTransaction()) session.startTransaction()

    // 5. Create locally
    const fs_promises = require('fs').promises
    const default_product_category_tree = require('../../static/product_category_tree.json')
    const default_certificate_template_buffer = await fs_promises.readFile(
        '../../static/default_certificate_template.docx'
    )
    const default_certificate_template = {
        name: 'default_certificate_template.docx',
        mimetype:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        buffer: default_certificate_template_buffer,
        size: default_certificate_template_buffer.length,
    }

    const now = Date.now

    const _competitions = body.map((competition) => ({
        ...competition,
        // name: required and included in competition
        // place: required and included in competition
        creation_date: now,
        // entry_opened is optional. It defaults to false by model.
        ...(competition.entry_opened && { last_entry_open_date: now }), // If entry_opened is provided and true.
        // last_entry_close_date will be undefined.
        // competition_opened is optional. It defaults to false by model.
        ...(competition.competition_opened && { last_competition_open_date: now }),  // If competition_opened is provided and true.
        // last_competition_close_date will be undefined.
        // archived is forbidden, it defaults to false by model.
        // archival_date will be undefined.
        // payment_needed is optional. It defaults to false by model.
        // association_members_need_to_pay is optional if payment_needed is true, otherwise forbidden. 
        // entry_fee_amount, entry_fee_currency is OK
        ...(!(competition.product_category_tree ?? false) && {
            product_category_tree: default_product_category_tree,
        }),
        ...(!(competition.certificate_template ?? false) && {
            certificate_template: default_certificate_template,
        }),
        // ignore_extreme_values is optional. It defaults to false by model.
    }))
    const competitions = _competitions.map((competition) => new Competition_Model(competition))

    // 6. Validate created documents
    const competition_validator = require('../../../validators/schemas/Competition')
    try {
        const validator_promises = competitions.map((competition) =>
            competition_validator.validateAsync(competition)
        )
        await Promise.all(validator_promises)
    } catch (err) {
        if (!parent_session) {
            if (session.inTransaction()) await session.abortTransaction()
            await session.endSession()
        }
        return { code: 400, data: err.details }
    }

    // 7. Check dependencies: Ask all dependencies if this creation is possible.
    // Competition has no dependencies.

    // 8. Check collection integrity
    // Nothing needs to be checked.

    // 9. Save created documents
    await Competition_Model.bulkSave(competitions, { session: session })

    // 10. Update dependents
    // Nothing needs to be updated.

    // 11. Commit transaction and end session.
    if (!parent_session) {
        if (session.inTransaction()) await session.commitTransaction()
        await session.endSession()
    }

    // 12. Reply
    return {
        code: 201,
        data: undefined,
    }
}

module.exports = create