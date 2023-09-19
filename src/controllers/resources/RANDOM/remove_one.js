const remove_one = async (fields, model, session) => {

    // Check dependencies
    // Dependencies: [Product, Competition, User, Entry_Fee_Payment]


    // Remove document from db
    const ids_to_delete = products.map((product) => product._id.toString())
    await Product_Model.deleteMany({
        _id: { $in: ids_to_delete },
    }, {
        session: session
    })

    // Save one document


    // Update dependents
    // Dependents: [Rating, Rating_Picture]

    const Product_Model = require('../../../models/Product')
    const randomstring = require('randomstring')
    const forbidden_id_parts = require('../../../static/forbidden_id_parts.json')
    const find = require('../find.js')
    const find_competition = find('competition')
    const find_user = find('user')
    const tree_to_flat_array = require('../../../helpers/tree_to_flat_array')

    // NEW RULE: product id and secret id can be duplicate. but not in the same competition

    for (const product of products) {


        // Check dependencies, and uniqueness too if needed!
        // Competition:
        // competition_id should belong to a real competition

        const find_competition_result = await find_competition(
            {
                filter: {
                    _id: product.competition_id.toString()
                },
                projection: {
                    _id: 1,
                    product_category_tree: 1,
                    entry_opened: 1,
                    payment_needed: 1,
                    association_members_need_to_pay: 1
                }
            },
            { role: 'SERVER' },
            session
        )

        // return from here if find_competition_result status code is not OK?

        const competition = find_competition_result?.data?.[0] ?? null
        if (!competition) {
            return {
                code: 403,
                json: {
                    message: 'provided_competition_id_does_not_belong_to_a_real_competition'
                },
            }
        }
        // entry should be opened
        if (!competition.entry_opened) {
            return {
                code: 403,
                json: {
                    message: 'competition_entry_is_closed'
                },
            }
        }

        // product_category_id should be ok
        const product_category_array = tree_to_flat_array(competition.product_category_tree)
        if (!product_category_array.some(node => node.node_id === product.product_category_id)) {
            return {
                code: 403,
                json: {
                    message: 'product_category_id_is_not_a_route_in_competition_product_category_tree'
                },
            }
        }

        // approval type cannot be payment if competition does not need payment
        if (product.approval_type === 'payment' && !competition.payment_needed) {
            return {
                code: 403,
                json: {
                    message: 'product_approval_type_is_payment_but_competition_does_not_need_payment'
                },
            }
        }

        // approval type cannot be association member if association members need to pay too
        if (product.approval_type === 'association_member' && competition.association_members_need_to_pay) {
            return {
                code: 403,
                json: {
                    message: 'product_approval_type_is_association_member_but_for_competition_association_members_also_need_to_pay'
                },
            }
        }

        // User:
        // competitor_id should belong to a real user
        const find_user_result = await find_user(
            {
                filter: {
                    _id: product.competitor_id.toString(),
                },
                projection: {
                    registration_temporary: 1,
                    roles: 1,
                    association_member: 1
                }
            },
            { role: 'SERVER' },
            session
        )

        const user = find_user_result?.data?.[0] ?? null
        if (!user) {
            return {
                code: 403,
                json: {
                    message: 'provided_competitor_id_does_not_belong_to_a_real_user'
                },
            }
        }
        // return from here if find_user_result status code is not OK?

        // user should be activated
        if (user.registration_temporary) {
            return {
                code: 403,
                json: {
                    message: 'user_is_not_activated'
                },
            }
        }

        // user should be competitor
        if (!user.roles.includes('competitor')) {
            return {
                code: 403,
                json: {
                    message: 'user_is_not_a_competitor'
                },
            }
        }

        // if approval type is association member, then user should be association member
        if (product.approval_type = 'association_member' && !user.association_member) {
            return {
                code: 403,
                json: {
                    message: 'product_approval_type_is_association_member_but_competitor_is_not_association_member'
                },
            }
        }










        // Create without saving
        let existing_product
        let is_forbidden_part

        let public_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase',
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            public_id = `${letters}${numbers}`
            existing_product =
                (await Product_Model.exists({ public_id: public_id }, { session: session })) ||
                (await Product_Model.exists({ secret_id: public_id }, { session: session })) ||
                body.some((product) => product.public_id === public_id) ||
                body.some((product) => product.secret_id === public_id)

            is_forbidden_part = forbidden_id_parts.includes(letters)
        } while (existing_product || is_forbidden_part)
        product.public_id = public_id

        let secret_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase',
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            secret_id = `${letters}${numbers}`
            existing_product =
                (await Product_Model.exists({ public_id: secret_id }, { session: session })) ||
                (await Product_Model.exists({ secret_id: secret_id }, { session: session })) ||
                body.some((product) => product.secret_id === secret_id) ||
                body.some((product) => product.public_id === secret_id)

            is_forbidden_part = forbidden_id_parts.includes(letters)
        } while (existing_product || is_forbidden_part)
        product.secret_id = secret_id





        const _product = {
            competition_id: product.competition_id, // required
            competitor_id: product.competitor_id, // required
            public_id: product.public_id, // GENERATED
            secret_id: product.secret_id, // GENERATED
            product_name: product.product_name, // required
            ...(product.anonimized_product_name && { // optional
                anonimized_product_name: product.anonimized_product_name, // optional
            }),
            factory_name: product.factory_name, // required
            maturation_time_type: product.maturation_time_type, // required
            ...(product.maturation_time_type === 'matured' && { // required
                maturation_time_quantity: product.maturation_time_quantity, // required
            }),
            ...(product.maturation_time_type === 'matured' && { // required
                maturation_time_unit: product.maturation_time_unit, // required
            }),
            milk_type: product.milk_type, // required
            product_category_id: product.product_category_id, // required
            product_description: product.product_description, // required
            ...(product.anonimized_product_description && { // optional
                anonimized_product_description: product.anonimized_product_description, // optional
            }),
            ...(product.approved && { approved: product.approved }), // GENERATED
            ...(product.approved && { approval_type: product.approval_type }), // GENERATED
            ...(product.handed_in && { handed_in: product.handed_in }), // optional
        }

        if (competition.payment_needed) {
            if (
                !competition.association_members_need_to_pay &&
                user.association_member
            ) {
                product.approved = true
                product.approval_type = 'association_member'
            }
        } else {
            product.approved = true
            product.approval_type = 'bypass'
        }
        // Otherwise, the approved will be the default, "false", but this needs to be tested.

        const created_product = new Product_Model(_product)

        // 6. Validate created documenT
        const product_validator = require('../../../validators/schemas/Product')
        try {
            await product_validator.validateAsync(created_product)
        } catch (error) {
            return {
                code: 400,
                json: {
                    message: error.details
                    // maybe validation error should return the document itself to see what was wrong?
                }
            }
        }

        // 7. save document
        await created_product.save({ session: session })

        // 8. Update dependents
        // Nothing needs to be updated.



    }


    // 9. reply
    return {
        code: 201,
        json: {
            // we should return the created documents in an array, projected by the allowed projected fields for actor role
            // we should do it in the GLOBAL create.js
            // DO NOT REMOVE THIS COMMENT UNTIL ITS DONE!
            data: products
        }
    }


}

module.exports = remove_one