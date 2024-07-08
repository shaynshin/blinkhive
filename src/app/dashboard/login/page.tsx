"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMagic } from "@/lib/magic";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const magic = createMagic();
      const didToken = await magic!.auth.loginWithEmailOTP({ email });
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        router.push("/dashboard/merchant");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Login or Register</h2>
          <form onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email Address
              </label>
              <div className="form-control mb-4">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading loading-spinner loading-md" />
                ) : (
                  "Get OTP Access Code"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
