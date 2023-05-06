import axios from "axios"

const token = localStorage.getItem('token');
const headers = {
	'Authorization': `token ${token}`
}

const getUser = async (reqData) => {
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/get-users`,
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
const updateUser = async (reqData) => {
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/update-user`,
		reqData, { headers }).then(({ data }) => {
			if (data.success) {
				return data
			} else {
				return { success: false, message: data.message }
			}
		}).catch((e) => {
			return { success: false, message: e.message }
		})
}
const deleteUser = async (id) => {
	return await axios.get(`${import.meta.env.VITE_BASE_URL}/delete-user/${id}`,
		{ headers }).then(({ data }) => {
			if (data.success) {
				return data
			}
		}).catch((e) => {
			return { success: false, message: e.message }
		})
}
const createUser = async (req) => {
	return await axios.post(`${import.meta.env.VITE_BASE_URL}/create-user`,
		req, { headers }).then(({ data }) => {
			if (data.success) {
				return data
			}
		}).catch((e) => {
			return { success: false, message: e.message }
		})
}

export { getUser, deleteUser, createUser, updateUser }