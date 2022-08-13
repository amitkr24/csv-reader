const csv             = require('csv-parser')
const fs              = require('fs')


module.exports.index = function(req,res){
    const results         = [];
    fs.createReadStream('./upload/sample.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results);
      res.render('../view/index',{result:results})
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
}
module.exports.upload = function ( req, res ) {
    return res.redirect('back');
}