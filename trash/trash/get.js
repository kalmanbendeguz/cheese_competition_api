module.exports = async function (req, res, next) {
    try {
        console.log('mw:get')

        const Active_Password_Reset_Model = require('../../../../../../models/Active_Password_Reset')
        const Allowed_Judge_Model = require('../../../../../../models/Allowed_Judge')
        const Allowed_Organizer_Model = require('../../../../../../models/Allowed_Organizer')
        const Competition_Model = require('../../../../../../models/Competition')
        const Entry_Fee_Payment_Model = require('../../../../../../models/Entry_Fee_Payment')
        const Key_Value_Model = require('../../../../../../models/Key_Value')
        const Product_Model = require('../../../../../../models/Product')
        const Rating_Picture_Model = require('../../../../../../models/Rating_Picture')
        const Rating_Model = require('../../../../../../models/Rating')
        const User_Model = require('../../../../../../models/User')

        const allowed_judge = new Allowed_Judge_Model({
            email: 'kalmanbendeguz@gmail.com'
        })

        const allowed_organizer = new Allowed_Organizer_Model({
            email: 'kalmanbendeguz@gmail.com'
        })

        const competition = new Competition_Model({
            name: 'Első sajtverseny',
            place: 'Szeged',
        })

        const user = new User_Model({
            username: 'springfielde',
            email: 'kalmanbendeguz@gmail.com',
            hashed_password: 'vh79234f',
            roles: ['competitor', 'judge', 'organizer'],
            full_name: 'Kálmán Bendegúz Bence',
            contact_phone_number: '+36304633410',
            billing_information: {
                name: 'Kálmán Bendegúz Bence',
                tax_number: '78346523849',
                zip: '6726',
                city: 'Szeged',
                street: 'Demeter Ferenc',
                street_type: 'utca',
                house_number: '40',  
            },
            confirm_registration_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        })

        const product = new Product_Model({
            competition_id: competition._id,
            manufacturer_id: user._id,
            public_id: 'AAA000',
            secret_id: 'BBB000',
            product_name: 'Fincsi sajt egyed meg',
            factory_name: 'Családi manufaktúra',
            maturation_time_type: 'matured',
            maturation_time_quantity: 40,
            maturation_time_unit: 'day',
            milk_type: 'tehentej',
            product_category_list: [
                'erlelt_sajt',
                'finom_sajt',
                'edd_meg_legyszi'
            ],
            product_description: 'Nagyon finom, tehéntejből készült sajt amit a saját, családi gazdaságunkban készítettünk.',
        })

        const rating = new Rating_Model({
            product_id: product._id,
            user_id: user._id,
            aspects: [
                {
                    title: 'Íz',
                    score: 30,
                    blocks: [['aaa', 'bbb'],['ccc', 'ddd']],
                    comment: 'Ez igen, annyira finom hogy nagyon! Köszönjük a nevezést! Nagyon jóóó.'
                },
                {
                    title: 'Szag',
                    score: 69,
                    blocks: [['eee', 'fff'],['ggg', 'hhh']],
                    comment: 'Hát ezt büntetni kellene. Kihívtam a vegyi hatástalanító csapatot. Remélem megoldják a helyzetet.'
                }
            ],
            overall_impression: 'Valami akármi finom volt összességében hát nem is tudom, az a lényeg hogy remélem kijött a minimum karakterszám.',
            table_leader: true
        })

        const key_value = new Key_Value_Model({
            key: 'random_kulcs',
            value: 'random_ertek'
        })

        const active_password_reset = new Active_Password_Reset_Model({
            restore_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            user_id: user._id,
        })
        
        await allowed_judge.save()
        await allowed_organizer.save()
        await competition.save()
        await user.save()
        await product.save()
        await rating.save()
        await key_value.save()
        await active_password_reset.save()

        //const apr = new Active_Password_Reset_Model()

        //const bende_user = new User_Model({
        //    username: 'springfielde',
        //    email: 'kalmanbendeguz@gmail.com',
        //    hashed_password: 'oisioghj349fh34fhnerfn',
        //    roles: ['competitor', 'judge', 'organizer'],
        //    full_name: 'kalman_bendeguz_full_name',
        //    contact_phone_number: '+36304633410',
        //    billing_information: {
        //        name: 'kalman_bendeguz_billing',
        //        tax_number: '283758723573',
        //        zip: '6726',
        //        city: 'Szeged',
        //        street: 'Demeter Ferenc',
        //        street_type: 'utca',
        //        house_number: '40',
        //        address_details: 'bendeszoba',
        //    },
        //    association_member: true,
        //    table_leader: true,
        //})

        return next()
    } catch (err) {
        return next(err)
    }
}