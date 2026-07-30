import { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useRegister } from "../hooks/Auth/useRegister";

type ValidationErrors = {
  message: string;
  errors: Record<string, string[]>;
};

export default function Register() {
  const register = useRegister();

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const errors =
    (register.error as AxiosError<ValidationErrors>)?.response?.data?.errors ??
    {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register.mutate({
      username,
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto flex h-screen max-w-md items-center justify-center px-6">
        <div className="w-full rounded-lg bg-white shadow">
          <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">Create an account</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full rounded-lg border p-2.5 ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-lg border p-2.5 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg border p-2.5 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg border p-2.5 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) =>
                    setPasswordConfirmation(e.target.value)
                  }
                  className={`w-full rounded-lg border p-2.5 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              {register.isError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {(register.error as AxiosError<ValidationErrors>).response
                    ?.data?.message}
                </div>
              )}

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