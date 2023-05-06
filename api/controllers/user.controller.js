const User = require('../models/user.model');
const Item = require('../models/item.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isAuth } = require('../utils/utils');
require('dotenv').config();

const createUser = async (req, res) => {
	try {
		const auth = await isAuth(req);

		if (!auth.success) {
			return (res.status(401).json({ success: false, message: "Unauthorized!789879" }));
		}

		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ $or: [{ email }] });
		if (existingUser) {
			return res.status(400).send('Email already taken');
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			created_by: auth.id
		});
		await newUser.save();
		res.status(200).send({ success: true, message: "User created successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
		console.log("password, user.password", password, user.password)
		// Check if password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		// Generate JWT token with expiration time of 1 year
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1y' });

		res.json({ success: true, message: "Login successful!", token, id: user._id });
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}

const deleteUser = async (req, res) => {
	try {
		const auth = await isAuth(req);

		if (!auth.success) {
			return (res.status(401).json({ success: false, message: "Unauthorized!" }));
		}
		const { userId } = req.params
		await Item.deleteMany({ created_by: userId }).catch(e => {
			throw new Error(e)
		})
		await User.deleteOne({ _id: userId }).catch(e => {
			throw new Error(e)
		})

		res.status(200).json({ success: true, message: "User deleted successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}

const getUser = async (req, res) => {
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
			select: { name: 1, email: 1, created_by: 1 },
			collation: {
				locale: 'en'
			}
		};
		const queryUser = {
			...(queryText && {
				$or: [
					{ name: { $regex: queryText } },
					{ email: { $regex: queryText }, }
				]
			})
		}
		const users = await User.paginate(queryUser, options).catch((error) => {
			throw new Error(error)
		});
		res.status(200).send({ success: true, data: users.docs, loadMore: users.hasNextPage })
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}
const updateUser = async (req, res) => {
	try {
		const auth = await isAuth(req);
		if (!auth.success) {
			return (res.status(401).json({ success: false, message: "Unauthorized!" }));
		}
		req = req.body;
		await User.findByIdAndUpdate({ _id: req._id }, {
			$set: {
				name: req.name,
				email: req.email
			}
		}).catch(e => {
			throw new Error(e)
		})
		res.status(200).send({ success: true, message: "User updated successfully!" });
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, message: err.message });
	}
}
module.exports = { createUser, login, deleteUser, getUser, updateUser };