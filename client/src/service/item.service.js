import axios from "axios"

// Default config options
const authOptions = {
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

// // Create instance
// let instance = axios.create(authOptions);

// // Set the AUTH token for any request
// instance.interceptors.request.use(function (config) {
// 	const token = localStorage.getItem('token');
// 	config.headers.Authorization = token ? `Bearer ${token}` : '';
// 	return config;
// });


const token = localStorage.getItem('token');
const headers = {
	'Authorization': `token ${token}`
}

const login = async ({ email, password }) => {
	console.log({ email, password })
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password })
		.then(({ data }) => {
			if (data.success) {
				localStorage.setItem("token", data.token)
				localStorage.setItem("id", data.id)
				return data
			} else {
				return { success: false, message: data.message }
			}
		}).catch((e) => {
			console.log(e)
			return { success: false, message: e.message }
		})
}
const getItems = async (reqData) => {
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/get-items`,
		{ ...reqData }, { headers }).then(({ data }) => {
			if (data.success) {
				return data
			} else {
				return { success: false, message: data.message }
			}
		}).catch((e) => {
			console.log(e)
			return { success: false, message: e.message }
		})
}
const updateItem = async (reqData) => {
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/update-item`,
		{ ...reqData }, { headers }).then(({ data }) => {
			if (data.success) {
				return data
			} else {
				return { success: false, message: data.message }
			}
		}).catch((e) => {
			return { success: false, message: e.message }
		})
}
const deleteItem = async (id) => {
	return await axios.get(`${import.meta.env.VITE_BASE_URL}/delete-item/${id}`,
		{ headers }).then(({ data }) => {
			if (data.success) {
				return data
			}
		}).catch((e) => {
			return { success: false, message: e.message }
		})
}
const createItem = async (req) => {
	console.log(req)
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/create-item`,
		req, { headers }).then(({ data }) => {
			if (data.success) {
				return data
			}
		}).catch((e) => {
			return { success: false, message: e.message }
		})
}

export { login, getItems, updateItem, deleteItem, createItem }