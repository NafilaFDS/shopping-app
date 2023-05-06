const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, { timestamps: true });

ItemSchema.virtual('users', {
	ref: 'User',
	localField: 'created_by',
	foreignField: '_id',
	justOne: true
});
ItemSchema.plugin(mongoosePaginate);
const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;