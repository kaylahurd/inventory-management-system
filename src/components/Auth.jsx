import React, { useState } from "react";
import supabase from "../supabaseClient";

const Logo = () => (
  <div className="flex justify-center mb-4">
    <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
      LT
    </div>
  </div>
);

function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (isLogin) {
      response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } else {
      response = await supabase.auth.signUp({
        email,
        password,
      });
    }

    const { data, error } = response;
    if (error) {
      setError(error.message);
    } else {
      onLogin(data.session?.user || data.user);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-blue-100">
        <Logo />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {isLogin ? "Log In" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
