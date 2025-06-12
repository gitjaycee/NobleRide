// src/components/SignUp.tsx
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const slideInRight = {
        initial: { x: 1000, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
    };

    const slideInLeft = {
        initial: { x: -1000, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signUp(formData.email, formData.password, formData.name, formData.contact);
            // User will be redirected automatically based on their role
        } catch (error: any) {
            setError(error.message || "An error occurred during sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center bg-white h-screen">
            <div className="max-w-6xl h-150 flex border-2 bg-blue-50 rounded-lg overflow-hidden shadow-xl">
                {/* Left Panel */}
                <motion.div
                    className="flex flex-col items-center justify-center w-[45vw] bg-[#173D54] text-white"
                    variants={slideInRight}
                    initial="initial"
                    animate="animate"
                >
                    <h1 className="text-5xl font-bold">Welcome Back!</h1>
                    <p className="text-center mt-4">
                        To keep connected with us please <br />
                        log in with your personal info
                    </p>
                    <button
                        onClick={() => navigate("/SignIn")}
                        className="my-10 px-10 py-2 font-bold border-2 rounded-xl border-white hover:bg-white hover:text-[#173D54] transition"
                    >
                        SIGN IN
                    </button>
                    <img
                        src="/hero_img.webp"
                        alt="Hero"
                        className="w-[300px] object-contain"
                    />
                </motion.div>

                {/* Right Panel - Sign Up Form */}
                <motion.form
                    className="flex flex-col items-center justify-center w-[55vw] h-full px-10 py-12 space-y-6"
                    variants={slideInLeft}
                    initial="initial"
                    animate="animate"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-5xl font-bold text-center text-black mb-6">
                        Create Account
                    </h1>

                    {error && (
                        <div className="w-[400px] p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                        required
                    />

                    <input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                        pattern="[0-9]{10}"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                        required
                        minLength={6}
                    />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white font-bold py-2 px-10 rounded-full transition ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#173D54] hover:bg-[#122f40]'
                            }`}
                        >
                            {loading ? "Creating Account..." : "Sign up"}
                        </button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}

export default SignUp;