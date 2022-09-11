const mongoose      = require('mongoose') // include mongoose
const filesSchema   = new mongoose.Schema({
    // name field added
    name: {
        type: String,
        requied: true,
      },
},
    //added timestamps
{
    timestamps: true
})
const files = mongoose.model("files", filesSchema);
module.exports = files;
