// src/components/SignIn.tsx
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
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
            await signIn(formData.email, formData.password);
            // User will be redirected automatically based on their role
        } catch (error: any) {
            setError(error.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigation = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate("/SignUp");
    };

    return (
        <section className="flex items-center justify-center bg-white h-screen">
            <div className="max-w-6xl h-150 flex border-2 bg-blue-50 rounded-lg overflow-hidden shadow-xl">
                {/* Left Panel - Sign In Form */}
                <motion.form
                    className="flex flex-col items-center justify-center w-[55vw] h-full px-10 py-12 space-y-6"
                    variants={slideInRight}
                    initial="initial"
                    animate="animate"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-5xl font-bold text-center text-black mb-20">
                        Sign In To Continue
                    </h1>

                    {error && (
                        <div className="w-[400px] p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center mb-4">
                            {error}
                        </div>
                    )}

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
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                        required
                    />
                    <div className="flex flex-col text-black justify-center">
                        <p className="mb-16 underline cursor-pointer">Forgot Your Password?</p>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white font-bold py-2 px-10 rounded-full transition ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#173D54] hover:bg-[#122f40]'
                            }`}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                </motion.form>

                {/* Right panel */}
                <motion.div
                    className="flex flex-col items-center justify-center w-[45vw] bg-[#173D54] text-white"
                    variants={slideInLeft}
                    initial="initial"
                    animate="animate"
                >
                    <h1 className="text-5xl font-bold">Hello, Friends!</h1>
                    <p className="text-center mt-4">
                        Enter your personal details <br />
                        and start your journey with us
                    </p>
                    <button
                        onClick={handleNavigation}
                        className="my-10 px-10 py-2 font-bold border-2 rounded-xl border-white hover:bg-white hover:text-[#173D54] transition"
                    >
                        SIGN UP
                    </button>
                    <img src="/hero_img.webp" alt="Hero" className="w-[300px] object-contain" />
                </motion.div>
            </div>
        </section>
    );
}

export default SignIn;