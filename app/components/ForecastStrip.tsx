'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, Droplets, Snowflake } from 'lucide-react';
import { fetchForecast, ForecastData } from '@/lib/weather';

interface ForecastStripProps {
    lat?: number;
    lon?: number;
}

export default function ForecastStrip({ lat, lon }: ForecastStripProps) {
    const [forecast, setForecast] = useState<ForecastData[]>([]);

    useEffect(() => {
        if (lat && lon) {
            const loadForecast = async () => {
                const data = await fetchForecast(lat, lon);
                setForecast(data);
            };
            loadForecast();
        }
    }, [lat, lon]);

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case 'Rain': return <Droplets className="w-6 h-6 text-blue-300" />;
            case 'Snow': return <Snowflake className="w-6 h-6 text-white" />;
            case 'Clouds': return <Cloud className="w-6 h-6 text-gray-300" />;
            default: return <Sun className="w-6 h-6 text-yellow-300" />;
        }
    };

    if (!forecast.length) return null;

    return (
        <div className="w-full overflow-x-auto pb-4 pt-2">
            <div className="flex justify-between min-w-[800px] gap-4 px-2">
                {forecast.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                        <span className="text-white/60 text-sm font-medium">{item.day}</span>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-white">{item.tempMax}°</span>
                            <span className="text-xs text-white/40">{item.tempMin}°</span>
                        </div>
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            {getWeatherIcon(item.condition)}
                        </div>

                        {/* Visual connector line dot */}
                        <div className="w-2 h-2 rounded-full bg-white/20 mt-2 group-hover:bg-white/60 transition-colors" />
                    </div>
                ))}
            </div>

            {/* SVG Curve Line (Decorative) */}
            <div className="relative h-12 w-full min-w-[800px] -mt-8 pointer-events-none opacity-30">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    <path
                        d="M0,40 Q100,10 200,40 T400,40 T600,20 T800,40"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>
            </div>
        </div>
    );
}
