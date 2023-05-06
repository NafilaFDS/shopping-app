import React from 'react'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '@mui/material'

const UserModal = (props) => {
	const handleSubmit = async () => {
		if (!props.user.name || !props.user.email) {
			if (props.origin === "add" && !props.user.password) {
				alert("Please add a password!")
			} else {
				alert("Please fillup all the fields!")
			}
		} else {
			props.submitHandler()
		}
	}
	const userInput = (e) => {
		const { value, name } = e.target
		props.setUser(preVal => {
			return { ...preVal, [name]: value }
		})
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
					{`${props.origin === "update" ? "Edit" : "Add"} user`}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form >
					<Form.Group className="mb-3" >
						<Form.Label>User name</Form.Label>
						<Form.Control name="name" value={props.user.name} onChange={(e) => userInput(e)} />
					</Form.Group>
					<Form.Group className="mb-3" >
						<Form.Label>User Email</Form.Label>
						<Form.Control name="email" type="email" value={props.user.email} onChange={(e) => userInput(e)} />
					</Form.Group>
					{
						props.origin === "add" &&
						<Form.Group className="mb-3" >
							<Form.Label>User Password</Form.Label>
							<Form.Control name="password" type="password" value={props.user.password} onChange={(e) => userInput(e)} />
						</Form.Group>
					}
					<Button variant="contained" onClick={() => { handleSubmit() }}>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default UserModal