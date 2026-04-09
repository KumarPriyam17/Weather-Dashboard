'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WeatherSearchProps {
    onSearch: (city: string) => void;
}

export default function WeatherSearch({ onSearch }: WeatherSearchProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
            <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search for a city..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input text-lg placeholder-white/40 shadow-lg focus:ring-2 focus:ring-white/20 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />

                <AnimatePresence>
                    {query && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            Search
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
}
