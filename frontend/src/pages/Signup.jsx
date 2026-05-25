import { useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import "../styles/auth.css";

function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");
            return;
        }

        try {

            await axios.post(
                "http://127.0.0.1:8000/auth/signup",
                {
                    fullName: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }
            );

            alert("Signup Successful");

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {

            if (Array.isArray(error.response?.data?.detail)) {

                const messages = error.response.data.detail
                    .map(err => err.msg)
                    .join("\n");

                alert(messages);

            } else {

                alert(
                    error.response?.data?.detail ||
                    "Signup Failed"
                );
            }
        }
    };

    return (

        <div className="auth-container">

            <h1 className="auth-title">
                Create Account
            </h1>

            <form
                onSubmit={handleSignup}
                className="auth-form"
            >

                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="auth-input"
                />

                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                />

                <div className="password-box">

                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                    />

                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>

                </div>

                <div className="password-box">

                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="auth-input"
                    />

                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>

                </div>

                <button
                    type="submit"
                    className="auth-button"
                >
                    Create Account
                </button>

            </form>

            <p className="auth-footer">

                Already have an account?

                <Link
                    to="/"
                    className="auth-link"
                >
                    Login
                </Link>

            </p>

        </div>
    );
}

export default Signup;