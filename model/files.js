const mongoose      = require('mongoose')
const filesSchema   = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
      },
},
{
    timestamps: true
})
const files = mongoose.model("files", filesSchema);
module.exports = files;
