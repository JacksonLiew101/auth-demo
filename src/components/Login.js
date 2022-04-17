import React, { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError('')
            setLoading(true) // to allow the button to hide to avoid multiple sign up events
            await login(emailRef.current.value, passwordRef.current.value).then((cred) => {
                 console.log('User logged in: ', cred.user)
                //reset whole input form
            }).catch((err) => {
                setError(err.message)
            });
        } catch{
            setError('Failed to login')
        }
        setLoading(false)
        navigate('/')
    }

    return (
        // <> is for fragment
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In Now</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading? 1: 0} className="w-100 mt-3" type="submit">Login</Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Link to="/forgot-password">Forget password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup"> Sign Up here</Link> 
            </div>  
        </>
    )
}