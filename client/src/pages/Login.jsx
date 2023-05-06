import { Button, Form } from 'react-bootstrap';
import { useState } from "react"
import { login } from '../service/item.service';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	const userInput = (e) => {
		const { value, name } = e.target
		setUser(preVal => {
			return { ...preVal, [name]: value }
		})
	}
	const handleSubmit = async () => {
		if (!user.email || !user.password) {
			alert("Please enter email and password")
		} else {
			const response = await login(user)
			if (response.success) {
				navigate("/items");
			} else {
				alert("Something went wrong!")
			}
		}
	}
	return (
		<div style={{ height: "100vh" }} className='bg-primary bg-opacity-25'>
			<div className='center'>
				<h2 className='text-center'>Login</h2>
				<Form >
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control onChange={(e) => userInput(e)} name="email" type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control onChange={(e) => userInput(e)} name="password" type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="primary" onClick={() => { handleSubmit() }}>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default Login;