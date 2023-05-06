import React from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '@mui/material'

const ItemModal = (props) => {
	const handleSubmit = async () => {
		if (!props.name) {
			alert("Please enter a name")
		} else {
			props.submitHandler()
		}
	}
	return (
		<Modal
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{`${props.origin === "update" ? "Edit" : "Add"} item`}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form >
					<Form.Group className="mb-3" >
						<Form.Label>Item name</Form.Label>
						<Form.Control value={props.name} onChange={(e) => props.setName(e.target.value)} />
					</Form.Group>
					<Button variant="contained" onClick={() => { handleSubmit() }}>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default ItemModal