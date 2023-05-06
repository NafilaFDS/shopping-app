import { useState } from 'react';
import { Table } from 'react-bootstrap';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import moment from 'moment';

export default function UserTable(props) {
	const { rows, deleteLocal } = props
	const user_id = localStorage.getItem("id");

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>email</th>
						<th>Created Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{rows.length > 0 &&
						rows.map(item => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm a")}</td>
								<td>
									{user_id === item.created_by &&
										<>
											<Button className='me-2' variant="contained"
												onClick={() => deleteLocal(item._id)}
											>
												<DeleteOutlineIcon />
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