import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/Auth/useRegister";

export default function Register() {
  const register = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register.mutate({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </Link>

        <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
              Create an account
            </h1>

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border p-2.5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-lg border p-2.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  className="w-full rounded-lg border p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirm Password
                </label>

                <input
                  id="password_confirmation"
                  type="password"
                  className="w-full rounded-lg border p-2.5"
                  value={passwordConfirmation}
                  onChange={(e) =>
                    setPasswordConfirmation(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={register.isPending}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {register.isPending
                  ? "Creating account..."
                  : "Create an account"}
              </button>

              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}