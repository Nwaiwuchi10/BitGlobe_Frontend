import React, { useEffect, useState } from "react";
import axios from "axios";
import { countryApi, RegisterApi } from "../../Api/Api";
import bg from "../../assets/img/register_background.webp";
import { Link, useNavigate } from "react-router-dom";
// Replace with your backend base URL, e.g. http://localhost:5000 or from env
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// RAFCe: Register Screen
interface Country {
  name: string;
  flag: string;
}
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(countryApi);
        const countriesData: Country[] = response.data.data.map(
          (country: any) => ({
            name: country.name,
            flag: country.flag,
            // iso2: country.iso2,
            // iso3: country.iso3,
          })
        );
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
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
    if (
      !form.email ||
      !form.firstName ||
      !form.lastName ||
      !form.country ||
      !form.password
    ) {
      setError("Please fill in all fields");
      return false;
    }
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email);
    if (!emailOk) {
      setError("Enter a valid email address");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
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
        RegisterApi,
        {
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          country: form.country,
          password: form.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Registration successful! You can now sign in.");
      setForm({
        email: "",
        firstName: "",
        lastName: "",
        country: "",
        password: "",
      });
      console.log("Register response", res.data);
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("userId", res.data.userId);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Registration failed";
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
              Create your account
            </h1>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-white/80">
              Join and start investing smarter. Secure sign‑up with a modern,
              responsive design.
            </p>
            <ul className="mt-6 space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Fast &
                secure onboarding
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />{" "}
                Referral rewards supported
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />{" "}
                Optimized for all screens
              </li>
            </ul>
          </section>

          {/* Right side - form card */}
          <section className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <h2 className="mb-1 text-center text-2xl font-semibold text-gray-900">
                Register
              </h2>
              <p className="mb-6 text-center text-sm text-gray-500">
                Fill in your details to get started
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-blue-600 transition focus:ring-2"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-blue-600 transition focus:ring-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-blue-600 transition focus:ring-2"
                    id="demo-multiple-name"
                    // multiple

                    value={form.country}
                    onChange={(e: any) =>
                      setForm((prev) => ({ ...prev, country: e.target.value }))
                    }

                    // input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                  >
                    <option value="">Select a country</option>
                    {countries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country, index) => (
                        <option key={index} value={country.name}>
                          {/* {country.name} */}
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="inline-block w-5 h-4 mr-2"
                          />
                          {country.name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div>
                  <label
                    htmlFor="country"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Nigeria"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-blue-600 transition focus:ring-2"
                    required
                  />
                </div> */}

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
                  {loading ? "Creating account…" : "Create account"}
                </button>

                <p className="pt-2 text-center text-xs text-gray-500">
                  By registering, you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Register;
