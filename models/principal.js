var mongoose = require("mongoose");

var principalSchema = mongoose.Schema({
    name    : String,
    authent : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        index_no: String
    },
    email      : String,
    birthDay   : String,
    address    : String
});

module.exports = mongoose.model("Principal", principalSchema);