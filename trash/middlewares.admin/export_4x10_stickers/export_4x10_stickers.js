const export_4x10_stickers = function() {
    
    return async function(req, res, next) {
        console.log('export_4x10_stickers')

        const Cheese_Model = require('../../config/db').mongoose.connection.db.collection('cheeses')

        let cheeses = await Cheese_Model.find(
            {}, 
        )
        .project
        ({
            _id: 0,
            factory_name: 1,
            product_name: 1,
            public_id: 1, 
            secret_id: 1
        })
        .toArray()

        cheeses = cheeses.sort((a,b) => a.public_id.localeCompare(b.public_id))

        const empty_cheese = {
            factory_name: '',
            product_name: '',
            public_id: '', 
            secret_id: ''
        }

        let cheeses_by_10 = []

        for (let i = 0; i < cheeses.length; i += 10) {
            let chunk = cheeses.slice(i, i + 10);
            if(chunk.length !== 10) {
                const empty_cheeses = [...Array(10-chunk.length).keys()].map(i => empty_cheese)
                chunk = chunk.concat(empty_cheeses)
            }
            cheeses_by_10.push(chunk)
        }

        const last_page_rows = cheeses.length < 10 ? cheeses.length : cheeses.length % 10 === 0 ? 10 : cheeses.length % 10

        cheeses_by_10 = cheeses_by_10.map((_10_cheeses, j) => {
            let current_10_cheeses = _10_cheeses.map((cheese, i) => {
                let returned = {}

                if(j === cheeses_by_10.length - 1 && i >= last_page_rows) {
                    returned[`${i+1}x1`] = ''
                } else {
                    returned[`${i+1}x1`] = `${cheese.factory_name} - ${cheese.product_name}\n(${cheese.public_id})`
                }
                
                returned[`${i+1}x2`] = cheese.public_id
                returned[`${i+1}x3`] = cheese.public_id
                returned[`${i+1}x4`] = cheese.secret_id
                return returned
            })
            current_10_cheeses = Object.assign({}, ...current_10_cheeses)
            return current_10_cheeses
        }
        )

        const PizZip = require("pizzip");
        const Docxtemplater = require("docxtemplater");
        const fs = require("fs").promises;

        //let receipt_parameters = {}
        //receipt_parameters.competition_name = (await Key_Value_Model.findOne({key: 'competition_name'})).value
        //receipt_parameters.competition_location = (await Key_Value_Model.findOne({key: 'competition_location'})).value

        const content = await fs.readFile(
            'src/static/4x10_matrica.docx',
            "binary"
        );

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            //paragraphLoop: true,
            linebreaks: true
        })

        //const nxm = [...Array(40).keys()].map(i => `${Math.floor(i/4)+1}x${(i%4)+1}`)
        //console.log(nxm)

         //Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        await doc.renderAsync({
            cheeses_by_10: cheeses_by_10
        });
//
        const docx_buffer = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
//
        res.writeHead(
            200, 
            [
                ['Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                ['Content-Disposition', `attachment; filename="matrica_4x10.docx"`]
            ]
        )
//
        return res.end(docx_buffer)

        
    }
}

module.exports = export_4x10_stickers