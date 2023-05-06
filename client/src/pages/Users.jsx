import { useState, useEffect } from 'react'
import UserTable from '../components/users/UserTable'
import { Form, InputGroup } from 'react-bootstrap'
import { deleteUser, getUser, createUser, updateUser } from '../service/user.service'
import SearchIcon from '@mui/icons-material/Search';
import { Button, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserModal from '../components/users/UserModal';

const Users = () => {
	const [queryText, setQueryText] = useState("")

	const [page, setPage] = useState(1);
	const [rows, setRows] = useState({});
	const [user, setUser] = useState({});
	const [openModal, setOpenModal] = useState(false);

	const searchItem = (p) => {
		getUser({
			pageNumber: p,
			queryText
		}).then((data) => {
			console.log(data)
			setRows(data)
		})
	}
	const getData = () => {
		getUser({
			pageNumber: page,
			queryText
		}).then((data) => {
			console.log(data)
			setRows(data)
		})
	}
	const deleteLocal = async (id) => {
		const resp = await deleteUser(id)
		if (resp) {
			if (resp.success) {
				getData();
			} else {
				alert("Something went wrong!")
			}
		}
	}
	const addUser = async () => {
		const resp = await createUser(user)
		if (resp) {
			if (resp.success) {
				onHide()
				getData();
			} else {
				alert("Something went wrong!")
			}
		}
	}
	const updateUserLocal = async () => {
		const resp = await updateUser(user)
		if (resp) {
			if (resp.success) {
				let tempRow = rows.data
				const indx = tempRow.findIndex((obj => obj._id === user._id));
				tempRow[indx].name = user.name;
				tempRow[indx].email = user.email;
				setRows(preVal => {
					return { ...preVal, data: tempRow }
				})
				onHide()
			} else {
				alert("Something went wrong!")
			}
		}
	}
	const onHide = () => {
		setOpenModal(false)
		setUser({})
	}
	useEffect(() => {
		getData();
	}, [])

	return (
		<div>
			<UserModal
				user={user}
				setUser={setUser}
				show={openModal}
				onHide={() => onHide()}
				submitHandler={() => user._id ? updateUserLocal() : addUser()}
				origin={user._id ? "update" : "add"}
			/>
			<div className='d-flex justify-content-between mb-2' >
				<InputGroup className='w-50'>
					<Form.Control
						placeholder="User's name or email"
						onChange={(e) => { setQueryText(e.target.value) }}
					/>
					<Button variant="contained" onClick={() => { searchItem(page) }} >
						<SearchIcon />
					</Button>
				</InputGroup>
				<Button variant="contained" onClick={() => { setOpenModal(true) }} >
					<AddIcon />
				</Button>
			</div>
			{
				rows.data?.length > 0 &&
				<>
					<UserTable
						rows={rows.data}
						deleteLocal={deleteLocal}
						setUser={setUser}
						setOpenModal={setOpenModal}
					/>
					<div className='d-flex justify-content-center'>
						<Pagination
							page={page}
							onChange={(e, p) => {
								searchItem(p)
								setPage(p)
							}}
							count={rows.loadMore ? page + 1 : page}
							variant="outlined"
							color="primary"
							hideNextButton={!rows.loadMore}
						/>
					</div>
				</>
			}
		</div>
	)
}

export default Users