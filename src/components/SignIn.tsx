import { Link } from "react-router-dom";

function SignIn(){
    return(
        <section className="flex items-center justify-center bg-white h-screen">
            <div className="max-w-6xl h-150 flex border-2 bg-blue-50 rounded-lg overflow-hidden shadow-xl">
                
                {/* Left Panel - Sign Up Form */}
                <form className="flex flex-col items-center justify-center w-[55vw] h-full px-10 py-12 space-y-6">
                    <h1 className="text-5xl font-bold text-center text-black mb-20">
                        Sign In To Continue
                    </h1>

                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                    required
                    />

                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
                    required
                    />

                    <div className="flex flex-col text-black justify-center">
                        <p className="mb-16 underline">Forgot Your Password?</p>
                    <button
                        type="submit"
                        className="bg-[#173D54] text-white font-bold py-2 px-10 rounded-full hover:bg-[#122f40] transition"
                    >
                        Sign up
                    </button>
                    </div>
                </form>
                {/* Right panel */}
                 <div className="flex flex-col items-center justify-center w-[45vw] bg-[#173D54]  text-white">
                    <h1 className="text-5xl font-bold">Hello, Friends!   </h1>
                    <p className="text-center mt-4">
                        Enter your personal details <br />
                        and start your journey with us
                    </p>
                    <Link
                    to="/SignUp"
                    className="my-10 px-10 py-2 font-bold border-2 rounded-xl border-white hover:bg-white hover:text-[#173D54] transition"
                    >
                    SIGN IN
                    </Link>
                    <img
                    src="/hero_img.webp"
                    alt="Hero"
                    className="w-[300px] object-contain"
                    />
                </div>

            </div>
        </section>
    )
}
export default SignIn;