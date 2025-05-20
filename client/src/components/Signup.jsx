import React, { useState } from 'react';
import Form from './common/Form';
import Input from './common/Input';
import Button from './common/Button';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        phone: ''
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
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Signup successful');
            } else {
                const data = await response.json();
                console.error('Signup failed:', data.message);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <Form title="Create Account" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
                <Input
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <Input
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

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

                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Button type="submit" fullWidth>
                    Sign Up
                </Button>
            </div>
        </Form>
    );
}

export default Signup; 