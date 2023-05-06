const Item = require('../models/item.model');
const User = require('../models/user.model');
const { isAuth } = require('../utils/utils');

const createItem = async (req, res) => {
	try {
		const auth = await isAuth(req);
		if (!auth.success) {
			return (res.status(401).json({ success: false, message: "Unauthorized!" }));
		}

		const newItem = new Item({
			name: req.body.name,
			created_by: auth.id
		});
		await newItem.save();
		res.status(200).send({ success: true, message: "Item created successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}

const getItems = async (req, res) => {
	try {
		const auth = await isAuth(req);
		if (!auth.success) {
			return (res.status(401).json({ success: false, message: "Unauthorized!" }));
		}
		req = req.body;
		let queryText = "";
		if (req.queryText) {
			queryText = req.queryText.replace(/[(),{}.]/g, '');
		}
		const options = {
			page: req.pageNumber,
			limit: 10,
			sort: { createdAt: -1 },
			select: { name: 1, created_by: 1, createdAt: 1 },
			populate: {
				path: 'created_by',
				select: 'name email',
			},
			collation: {
				locale: 'en'
			}
		};
		const queryItem = {
			...(queryText && {
				name: { $regex: queryText }
			})
		}
		const items = await Item.paginate(queryItem, options).catch((error) => {
			throw new Error(error)
		});
		res.status(200).send({ success: true, data: items.docs, loadMore: items.hasNextPage })
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}

const updateItem = async (req, res) => {
	try {
		const auth = await isAuth(req);
		if (!auth.success) {
			return (res.status(401).json({ success: false, message: "Unauthorized!" }));
		}
		req = req.body;
		await Item.findByIdAndUpdate({ _id: req.id }, {
			$set: {
				name: req.name
			}
		}).catch(e => {
			throw new Error(e)
		})
		res.status(200).send({ success: true, message: "Item updated successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}

const deleteItem = async (req, res) => {
	const auth = await isAuth(req);
	if (!auth.success) {
		return (res.status(401).json({ success: false, message: "Unauthorized!" }));
	}
	const { itemId } = req.params

	await Item.deleteOne({ _id: itemId }).catch(e => {
		throw new Error(e)
	})
	res.status(200).send({ success: true, message: "Item deleted successfully!" });
}

module.exports = { createItem, getItems, updateItem, deleteItem };