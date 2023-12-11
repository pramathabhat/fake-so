// Tag Document Schema
let mongoose = require("mongoose")


const tagsSchema = new mongoose.Schema({
	name: {type: String, required: true, maxLength: 20},
	createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'users'}
})

const tagsModel = mongoose.model("tags", tagsSchema);

module.exports = tagsModel;