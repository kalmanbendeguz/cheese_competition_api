import XLSX from 'xlsx';
      
console.log('download_tb');

// Acquire Data (reference to the HTML table)
var table_elt = document.getElementById("view_results_table");

// Extract Data (create a workbook object from the table)
var workbook = XLSX.utils.table_to_book(table_elt);

// Process Data (add a new row)
var ws = workbook.Sheets["Sheet1"];
XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});

XLSX.writeFileXLSX(workbook, {type: 'buffer', bookType: 'xlsx'});  



/*
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table)
        let a = table.cloneNode(true)
        for (let index = 0; index < a.rows.length; index++) {
            a.rows[index].deleteCell(9);        
        }
        var ctx = { worksheet: name || 'Worksheet', table: a.innerHTML }

        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();

    }
})()


/*function tableToCSV1() { 
    const XLSX = require("xlsx")

    var   wb = XLSX.utils.table_to_book(document.getElementById('view_results_table'), {sheet:"SajtApp"});
      
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

}



function exportReportToExcel() {
    const XLSX = require("xlsx")
    // Acquire Data (reference to the HTML table)
    var table_elt = document.getElementById("view_results_table");

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt);

    // Process Data (add a new row)
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "Report.xlsx");
}

function fnExcelReport() {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('#view_results_table').html();
    tab_text = tab_text + '</table></body></html>';

    var data_type = 'data:application/vnd.ms-excel';
    
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Test file.xls');
        }
    } else {
        $('#testD').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#testD').attr('download', 'Test file.xls');
    }

}



function tableToCSV() {
 
    // Variable to store the final csv data
    var csv_data = [];
    var fresh = false;
    var csv_data_matured = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
 
        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');
 
        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
            // Get the text data of each cell of
            // a row and push it to csvrow
        
            csvrow.push(cols[j].innerText);
        }
 
        // Combine each column value with com
      
        csv_data.push(csvrow.join(";"));
   
        
    }
    // combine each row data with new line character
    csv_data = csv_data.join('\n');
  
    /* We will use this function later  to download
    the data in a csv file downloadCSVFile(csv_data);
    * /
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {
 
    // Create CSV file object and feed our
    // csv_data into it
    CSVFile = new Blob([csv_data], { type: "text/csv" });
 
    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');
 
    // Download csv file
    temp_link.download = "eredmenyek.xls";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
 
    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
 
    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
} */ 