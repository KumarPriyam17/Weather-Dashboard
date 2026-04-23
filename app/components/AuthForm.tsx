'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { login, signup } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
      //   <div className="w-full max-w-md p-8 rounded-2xl glass-panel relative overflow-hidden">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {isLogin ? "Login to your account" : "Create account"}
          </h2>
          <p className="text-white/80 text-sm">
            {isLogin
              ? "Enter your details"
              : "Sign up to start tracking weather"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-100 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl glass-input placeholder-white/30 focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl glass-input placeholder-white/30 focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl glass-button font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Create Account"}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    );
}
