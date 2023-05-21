const archived_cheeses_export_detailed_table = function() {
    
    return async function(req, res, next) {
        console.log('archived_cheeses_export_detailed_table')

        const counties_by_zip = require('../../static/counties_by_zip')

        for(let i=0; i < res.locals.cheeses.length; ++i){
            res.locals.cheeses[i].user.billing_zip = res.locals.cheeses[i].user.billing_zip.trim()
            res.locals.cheeses[i].zip_string = res.locals.cheeses[i].user.billing_zip
            res.locals.cheeses[i].city = res.locals.cheeses[i].user.billing_city
            res.locals.cheeses[i].county = counties_by_zip[res.locals.cheeses[i].user.billing_zip]
            res.locals.cheeses[i].milk_type_string = req.app.locals.dictionary[res.locals.cheeses[i].milk_type]
            res.locals.cheeses[i].product_category_list_string = res.locals.cheeses[i].product_category_list.map(e => req.app.locals.dictionary[e] ).join(' / ')
            res.locals.cheeses[i].maturation_time_string = res.locals.cheeses[i].maturation_time_type === 'fresh' ? 'Friss' : `${res.locals.cheeses[i].maturation_time_quantity} ${req.app.locals.dictionary[res.locals.cheeses[i].maturation_time_unit]}`
            res.locals.cheeses[i].maturation_time_days_equal = convert_to_days(res.locals.cheeses[i].maturation_time_quantity, res.locals.cheeses[i].maturation_time_unit)

            res.locals.cheeses[i] = { "public_id": res.locals.cheeses[i].public_id, "secret_id": res.locals.cheeses[i].secret_id, "product_name": res.locals.cheeses[i].product_name, "factory_name": res.locals.cheeses[i].factory_name, "milk_type_string": res.locals.cheeses[i].milk_type_string, "product_category_list_string": res.locals.cheeses[i].product_category_list_string, "maturation_time_string": res.locals.cheeses[i].maturation_time_string, "maturation_time_days_equal": res.locals.cheeses[i].maturation_time_days_equal, "product_description": res.locals.cheeses[i].product_description, "zip_string": res.locals.cheeses[i].zip_string, "city": res.locals.cheeses[i].city, "county": res.locals.cheeses[i].county}
        }

        //console.log(res.locals.cheeses)
        ///////////////////////////////

        //console.log(res.locals.cheeses)
        

        res.locals.cheeses.unshift({ public_id: 'Publikus', secret_id: 'Titkos', product_name: 'Termék neve', factory_name: 'Készítő / Sajtműhely neve', milk_type_string: 'Milyen tejből készült?', product_category_list_string: 'Termékkategória', maturation_time_string: 'Érlelési idő', maturation_time_days_equal: 'Érlelési idő napokban', product_description: 'Termékleírás', zip_string: 'Irányítószám', city: 'Település', county: 'Megye'})

        const XLSX = require("xlsx")
        
        let worksheet = XLSX.utils.json_to_sheet(res.locals.cheeses, { header: ["public_id", "secret_id", "product_name", "factory_name", "milk_type_string", "product_category_list_string", "maturation_time_string", "maturation_time_days_equal", "product_description", "zip_string", "city", "county"], skipHeader: true})

        let workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "arch_nevezett_termekek_reszl")
        
        //const tempy = await import('tempy')

        //let id_pairs_file_path = tempy.temporaryFile({name: 'azonositoparok.xlsx'});

        //console.log(id_pairs_file_path)

        let xlsx_buffer = XLSX.write(workbook, {type: 'buffer', bookType: 'xlsx'})
        //XLSX.writeFileAsync(workbook, id_pairs_file_path, (err) => {
         //   return res.download(id_pairs_file_path)
        //} )
        
        res.writeHead(
            200, 
            [
                ['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
                ['Content-Disposition', `attachment; filename="arch_nevezett_termekek_reszl.xlsx"`]
            ]
        )
        //return res.download(id_pairs_file_path)
        return res.end(xlsx_buffer)
        
        //X*/
        //return res.send('random')
    }

    function convert_to_days(quantity, unit){
        if(unit === 'day') return quantity
        if(unit === 'week') return quantity * 7
        if(unit === 'month') return quantity * 30
        return 0
    }

}

module.exports = archived_cheeses_export_detailed_table