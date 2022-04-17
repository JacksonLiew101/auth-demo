import React, { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading]    = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setMessage('')
            setError('')
            setLoading(true) // to allow the button to hide to avoid multiple sign up events
            await resetPassword(emailRef.current.value)
            setMessage("Check your email for further instruction")
        } catch{
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        // <> is for fragment
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
                        </Form.Group>
                        <Button disabled={loading? 1: 0} className="w-100 mt-3" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup"> Sign Up here</Link> 
            </div>  
        </>
    )
}