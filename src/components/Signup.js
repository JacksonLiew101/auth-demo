import React, { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !==
            confirmPasswordRef.current.value){
            return  setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true) // to allow the button to hide to avoid multiple sign up events
            await signup(emailRef.current.value, passwordRef.current.value).then((cred) => {
                 console.log('User created: ', cred.user)
                //reset whole input form
            }).catch((err) => {
                setError(err.message)
            });
        } catch{
            setError('Failed to create an account')
        }
        setLoading(false)
        navigate('/')
    }

    return (
        // <> is for fragment
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up Now</h2>
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
                        <Form.Group id="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required/>
                        </Form.Group>
                        <Button disabled={loading? 1:0} className="w-100 mt-3" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In here</Link>
            </div>  
        </>
    )
}