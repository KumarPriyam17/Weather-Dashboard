'use client';

import { WeatherData } from '@/lib/weather';
import { Cloud, Droplets, Wind, Sun, Snowflake, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherCardProps {
    data: WeatherData;
    onToggleFavorite?: () => void;
    isFavorite?: boolean;
}

export default function WeatherCard({ data, onToggleFavorite, isFavorite }: WeatherCardProps) {
    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case 'Rain': return <Droplets className="w-16 h-16 text-blue-200" />;
            case 'Snow': return <Snowflake className="w-16 h-16 text-white" />;
            case 'Clouds': return <Cloud className="w-16 h-16 text-gray-200" />;
            case 'Clear': return <Sun className="w-16 h-16 text-yellow-200" />;
            default: return <Sun className="w-16 h-16 text-yellow-200" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto p-8 rounded-3xl glass-panel relative overflow-hidden"
        >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-xl font-medium">{data.location}</span>
                        {onToggleFavorite && (
                            <button
                                onClick={onToggleFavorite}
                                className="ml-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Heart
                                    className={`w-6 h-6 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white/60'
                                        }`}
                                />
                            </button>
                        )}
                    </div>
                    <h1 className="text-8xl font-bold text-white mb-4 tracking-tighter">
                        {data.temperature}°
                    </h1>
                    <div className="flex items-center gap-4 text-white/90 text-xl font-medium bg-white/10 px-6 py-2 rounded-full">
                        {getWeatherIcon(data.condition)}
                        <span>{data.condition}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Wind className="w-4 h-4" />
                            <span className="text-sm">Wind</span>
                        </div>
                        <p className="text-2xl font-semibold text-white">{data.windSpeed} km/h</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Droplets className="w-4 h-4" />
                            <span className="text-sm">Humidity</span>
                        </div>
                        <p className="text-2xl font-semibold text-white">{data.humidity}%</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm col-span-2">
                        <div className="flex items-center gap-2 text-white/60 mb-1">
                            <Sun className="w-4 h-4" />
                            <span className="text-sm">Feels Like</span>
                        </div>
                        <p className="text-2xl font-semibold text-white">{data.feelsLike}°</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
