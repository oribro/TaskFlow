import React, { useState } from 'react';
import Form from './common/Form';
import Input from './common/Input';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Signin successful');
                navigate('/board');
            } else {
                const data = await response.json();
                console.error('Signin failed:', data.message);
            }
        } catch (error) {
            console.error('Error during signin:', error);
        }
    };

    return (
        <Form title="Log into your account" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
                <Input
                    id="username"
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Button type="submit" fullWidth>
                    Sign In
                </Button>
            </div>
        </Form>
    );
}

export default Signin; 