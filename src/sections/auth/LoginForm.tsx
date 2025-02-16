import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { loginUser } from "../../services/authService";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      if (response.error) throw new Error(response.message);
      const token = response.token;
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error(`Login failed: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      <div className="text-center mt-3">
        <Link
          to="/auth/register"
          className="text-gray-600 hover:text-indigo-600 text-sm"
        >
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
