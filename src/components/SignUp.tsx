import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataFromDB = {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9876543210',
        password: 'secret123',
      };

      setFormData(userDataFromDB);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Updated form data:', formData);

  };

  if (loading) return <p className="text-center py-10">Loading user data...</p>;

  return (
    <section className="flex w-screen h-screen bg-blue-50 overflow-hidden">
      {/* Left Panel */}
      <div className="flex flex-col items-center justify-center w-[45vw] h-full bg-[#173D54] text-white">
        <h1 className="text-5xl font-bold">Welcome Back!</h1>
        <p className="text-center mt-4">
          To keep connected with us please <br />
          log in with your personal info
        </p>
        <Link to="/SignIn" className="my-10 px-10 py-2 font-bold border-2 rounded-xl border-white hover:bg-white hover:text-[#173D54] transition">
          SIGN IN
        </Link>
        <img
          src="/hero_img.webp"
          alt="Hero"
          className="w-[300px] object-contain"
        />
      </div>

      {/* Right Panel - Sign Up Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-[55vw] h-full px-10 py-12 space-y-6"
      >
        <h1 className="text-5xl font-bold text-center text-black mb-6">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
          required
        />

        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
          pattern="[0-9]{10}"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-[400px] p-4 bg-blue-100 rounded-xl placeholder-blue-300 text-[#173D54] font-semibold border border-[#173D54] focus:outline-none"
          required
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#173D54] text-white font-bold py-2 px-10 rounded-full hover:bg-[#122f40] transition"
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
