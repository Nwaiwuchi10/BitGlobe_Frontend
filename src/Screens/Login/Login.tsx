import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/img/register_background.webp";
import { LoginApi } from "../../Api/Api"; // <-- define your login API endpoint here

// RAFCe: Login Screen
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return false;
    }
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email);
    if (!emailOk) {
      setError("Enter a valid email address");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        LoginApi,
        {
          email: form.email,
          password: form.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Login successful! Redirecting…");
      console.log("Login response", res.data);

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("isAdmin", res.data.isAdmin);
      localStorage.setItem("userId", res.data.userId);

      if (res.data.isAdmin === true) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with Bitcoin image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      {/* Navy blue gradient overlay */}
      <div
        className="absolute inset-0 -z-0 bg-gradient-to-br from-blue-900/85 via-blue-950/85 to-blue-900/85"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left side - headline */}
          <section className="flex flex-col justify-center text-white">
            <h3 className="mb-2 text-lg font-medium text-blue-400">
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                {" "}
                Go Back To Home
              </Link>
            </h3>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Welcome back
            </h1>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-white/80">
              Sign in to access your account and continue investing smarter.
            </p>
            <ul className="mt-6 space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Secure
                login with JWT
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Fast
                authentication
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Works
                across all devices
              </li>
            </ul>
          </section>

          {/* Right side - form card */}
          <section className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <h2 className="mb-1 text-center text-2xl font-semibold text-gray-900">
                Login
              </h2>
              <p className="mb-6 text-center text-sm text-gray-500">
                Enter your credentials to access your account
              </p>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-blue-600 transition focus:ring-2"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-12 text-gray-900 outline-none ring-blue-600 transition focus:ring-2"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 my-auto mr-2 h-9 rounded-lg px-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ cursor: "pointer" }}
                  disabled={loading}
                  className="mt-2 w-full rounded-2xl bg-blue-700 px-4 py-2.5 text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>

                <p className="pt-2 text-center text-xs text-gray-500">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    Register
                  </span>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
