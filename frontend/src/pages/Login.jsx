import { useState } from "react";
import axios from "axios";
import { Link,} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "../styles/auth.css";

function Login() {


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [buttonText, setButtonText] = useState("Login");

    const [emailError, setEmailError] = useState("");

    const [passwordStrength, setPasswordStrength] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "email") {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {

                setEmailError("Invalid Email");

            } else {

                setEmailError("");
            }
        }
        if (name === "password") {

            const hasNumber = /\d/.test(value);

            const hasSpecial =
                /[!@#$%^&*(),.?":{}|<>]/.test(value);

            if (value.length < 8) {

                setPasswordStrength("Weak");

            } else if (hasNumber && !hasSpecial) {

                setPasswordStrength("Medium");

            } else if (hasNumber && hasSpecial) {

                setPasswordStrength("Strong");

            } else {

                setPasswordStrength("Weak");
            }
        }
    };


    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setButtonText("Logging in...");

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            toast.success("Login Successful!");
            setButtonText("Login Successful ✓");

            setFormData({
                email: "",
                password: ""
            });

            setTimeout(() => {

                setLoading(false);

                setButtonText("Login");

                navigate("/dashboard");

            }, 1500);

        } catch (error) {

            setLoading(false);

            toast.error("Invalid Credentials");
            setButtonText("Invalid Credentials");

            setFormData({
                email: "",
                password: ""
            });

            setTimeout(() => {

                setButtonText("Login");

            }, 2000);
        }
    };


    return (

        <div className="auth-container">

            <h1 className="auth-title">
                Login
            </h1>

            <form
                onSubmit={handleLogin}
                className="auth-form"
            >

                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                />
                {
                    emailError && (
                        <p className="error-text">
                            {emailError}
                        </p>
                    )
                }


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
                {
                    formData.password && (

                        <p className={`strength-text ${passwordStrength.toLowerCase()}`}>

                            Password Strength: {passwordStrength}

                        </p>
                    )
                }


                <div className="options">

                    <label>

                        <input type="checkbox" />

                        Remember me

                    </label>

                    <span>
                        Forgot password?
                    </span>

                </div>


                <button
                    type="submit"
                    className="auth-button"
                    disabled={loading}
                >
                    {buttonText}
                </button>

            </form>


            <p className="auth-footer">

                Don't have an account?

                <Link
                    to="/signup"
                    className="auth-link"
                >
                    Signup
                </Link>

            </p>

        </div>
    );
}

export default Login;