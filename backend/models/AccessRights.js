const mongoose = require('mongoose');

const accessRightsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    access_rights: {
        type: Array,
        default: [],
    }, 
},
{timestamps: true},
);

module.exports = mongoose.model("AccessRights", accessRightsSchema);