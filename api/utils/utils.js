const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const isAuth = async (req) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return ({ success: false, message: 'Authorization header missing' });
		}
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id } = decoded;

		const authUser = await User.findById({ _id: id })
		if (!authUser) {
			return ({ success: false, message: 'Unauthorized' });
		}
		return ({ success: true, id: authUser._id, message: 'Authenticated!' })
	} catch (err) {
		console.error(err);
		return ({ success: false, message: err.message });
	}
}
module.exports = { isAuth }