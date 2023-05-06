import { useState } from 'react';
import { Table } from 'react-bootstrap';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import moment from 'moment';

export default function DataTable(props) {
	const { rows, updateItem, deleteLocal, setName, setSelectedId, setOpenModal } = props
	const user_id = localStorage.getItem("id");

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Created by</th>
						<th>Contact mail</th>
						<th>Created Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{rows.length > 0 &&
						rows.map(item => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.created_by.name}</td>
								<td>{item.created_by.email}</td>
								<td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm a")}</td>
								<td>
									{user_id === item.created_by._id &&
										<>
											<Button className='me-2' variant="contained"
												onClick={() => deleteLocal(item._id)}
											>
												<DeleteOutlineIcon />
											</Button>
											<Button variant="contained"
												onClick={() => {
													setSelectedId(item._id)
													setName(item.name)
													setOpenModal(true)
												}}
											>
												<EditIcon />
											</Button>
										</>
									}
								</td>
							</tr>
						))
					}
				</tbody>
			</Table>
		</>
	);
}