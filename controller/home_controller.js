const csv             = require('csv-parser')
const fs              = require('fs')
const LocalStorage    = require('node-localstorage').LocalStorage,
localStorage          = new LocalStorage('./scratch');
const fileModel       = require('../model/files');
const path            = require('path');
module.exports.index = async function(req, res){
    const results         = [];
    let id = req.params.id;
    try{
        let files=await fileModel.find({}).sort("createdAt");
        let active_file_name=await fileModel.findOne({id:id });
        console.log(active_file_name);
        
        if(id && active_file_name != null){
            var activeFile = active_file_name.name;
            let newPath =  path.join(__dirname, "../", 'uploads/'+activeFile);
        }else{
            let response =  {
                "page": {},
                "pageCount": {},
                "results": [{}]
            };
            res.render('../view/index',{result:response,fileData:files})
        }
        fs.createReadStream(newPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const pageCount = Math.ceil(results.length / 50);
            let page = parseInt(req.query.p);
            // console.log(page);
            if (!page) { page = 1;}
            if (page > pageCount) {
                page = pageCount
            }
            let response =  {
                "page": page,
                "pageCount": pageCount,
                "results": results.slice(page * 50 - 50, page * 50)
            };

            res.render('../view/index',{result:response,fileData:files})
        });
    }
    catch(err){
        return res.status(500).json({
            message:'Internal Server Error'
        })
    }
}
module.exports.upload = function ( req, res ) {
    return res.redirect('back');
}

module.exports.deletecsv = function(req,res){
    let tid = req.params.id;
    fileModel.findByIdAndDelete(tid, function(err){
        if(err){
            console.log('error in deleting in object from database');
            return;
        }
    });
    return res.redirect('back');
 }