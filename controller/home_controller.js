const csv             = require('csv-parser')
const fs              = require('fs')
const LocalStorage    = require('node-localstorage').LocalStorage,
localStorage          = new LocalStorage('./scratch');

module.exports.index = function(req,res){
    const results         = [];
    //local storgae
    let fileData = localStorage.getItem('CsvFiles');
    var nameArr = fileData.split(',');
    fs.createReadStream('./upload/sample.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results);
        res.render('../view/index',{result:results,fileData:nameArr})
    });
}
module.exports.upload = function ( req, res ) {
    return res.redirect('back');
}
