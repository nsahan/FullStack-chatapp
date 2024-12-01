import React, { useState } from 'react'
import { useAuth } from '../store/useAuth';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
      email:"",
      password:"",
    });
    const {login, isLoggingIn} = useAuth(); 

    const handleSubmit = async (e)=>{
      e.preventDefault();
      login(formData);
    }

  return (

    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back !</h1>
              <p className="text-base-content/60">Sign In to your Account</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="......"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
  {isLoggingIn ? (
    <>
      <Loader2 className="size-5 animate-spin" />
      Signing In...
    </>
  ) : (
    "Sign In"
  )}
</button>

          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an Account ?{" "}
              <Link to={"/signup"} className="link link-primary">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern title="Welcome Back ! " subtitle="Sign in to continue" />
    </div>
    
  )
}

export default Login
