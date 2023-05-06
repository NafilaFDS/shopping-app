import { useState, useEffect } from 'react'
import DataTable from '../components/items/DataTable'
import { Form, InputGroup } from 'react-bootstrap'
import { deleteItem, getItems, createItem, updateItem } from '../service/item.service'
import SearchIcon from '@mui/icons-material/Search';
import { Button, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ItemModal from '../components/items/ItemModal';

const Items = () => {
	const [queryText, setQueryText] = useState("")

	const [page, setPage] = useState(1);
	const [rows, setRows] = useState({});
	const [name, setName] = useState(null);
	const [selectedId, setSelectedId] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const searchUser = (p) => {
		getItems({
			pageNumber: p,
			queryText
		}).then((data) => {
			console.log(data)
			setRows(data)
		})
	}
	const getData = () => {
		getItems({
			pageNumber: page,
			queryText
		}).then((data) => {
			console.log(data)
			setRows(data)
		})
	}
	const updateItemLocal = async () => {
		const resp = await updateItem({ name, id: selectedId })
		if (resp) {
			if (resp.success) {
				let tempRow = rows.data
				const indx = tempRow.findIndex((obj => obj._id === selectedId));
				tempRow[indx].name = name;
				setRows(preVal => {
					return { ...preVal, data: tempRow }
				})
				onHide()
			} else {
				alert("Something went wrong!")
			}
		}
	}
	const deleteLocal = async (id) => {
		const resp = await deleteItem(id)
		if (resp) {
			if (resp.success) {
				getData();
			} else {
				alert("Something went wrong!")
			}
		}
	}
	const addItem = async () => {
		const resp = await createItem({ name })
		if (resp) {
			if (resp.success) {
				onHide()
				getData();
			} else {
				alert("Something went wrong!")
			}
		}
	}
	const onHide = () => {
		setOpenModal(false)
		setName("")
		setSelectedId(null)
	}
	useEffect(() => {
		getData();
	}, [])

	return (
		<div>
			<ItemModal
				name={name}
				setName={setName}
				show={openModal}
				onHide={() => onHide()}
				submitHandler={() => selectedId ? updateItemLocal() : addItem()}
				origin={selectedId ? "update" : "add"}
			/>
			<div className='d-flex justify-content-between mb-2' >
				<InputGroup className='w-50'>
					<Form.Control
						placeholder="Item's name"
						onChange={(e) => { setQueryText(e.target.value) }}
					/>
					<Button variant="contained" onClick={() => { searchUser(page) }} >
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
					<DataTable
						rows={rows.data}
						deleteLocal={deleteLocal}
						updateItem={updateItem}
						setName={setName}
						setSelectedId={setSelectedId}
						setOpenModal={setOpenModal}
					/>
					<div className='d-flex justify-content-center'>
						<Pagination
							page={page}
							onChange={(e, p) => {
								searchUser(p)
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

export default Items