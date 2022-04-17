import React, { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !==
            confirmPasswordRef.current.value){
            return  setError('Passwords do not match')
        }

        // easier to push all the promises and run at one go
        const promise = []
        setError('')
        setLoading(true)
        
        if(emailRef.current.value !== currentUser.email){
            promise.push(updateEmail(emailRef.current.value))
            // can try add to check for similar email account
        }

        if(passwordRef.current.value !== currentUser.password){
            promise.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promise).then(() => {
            navigate('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() =>{
            setLoading(false)
        })

    }

    return (
        // <> is for fragment
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" defaultValue={currentUser.email} ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group id="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same" ref={confirmPasswordRef}/>
                        </Form.Group>
                        <Button disabled={loading? 1:0} className="w-100 mt-3" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div> 
        </>
    )
}