'use client';

import { WeatherData } from '@/lib/weather';
import { Wind, Sunrise, Sunset, Droplets } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface WeatherSidebarProps {
    data: WeatherData;
}

// Mock data for wind chart - in a real app this would come from the API
const windData = [
    { time: '10:00', speed: 5 },
    { time: '11:00', speed: 8 },
    { time: '12:00', speed: 12 },
    { time: '13:00', speed: 10 },
    { time: '14:00', speed: 15 },
    { time: '15:00', speed: 11 },
    { time: '16:00', speed: 7 },
];

export default function WeatherSidebar({ data }: WeatherSidebarProps) {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Wind Status Card */}
            <div className="glass-card rounded-3xl p-6 flex-1 min-h-[200px]">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-white/60">
                        <Wind className="w-4 h-4" />
                        <span className="text-sm font-medium">Wind Status</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{data.windSpeed} <span className="text-sm font-normal text-white/40">km/h</span></span>
                </div>
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={windData}>
                            <defs>
                                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="speed"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#windGradient)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sunrise/Sunset Card */}
            <div className="glass-card rounded-3xl p-6 flex-1 min-h-[200px]">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-white/60">
                        <Sunrise className="w-4 h-4" />
                        <span className="text-sm font-medium">Sunrise & Sunset</span>
                    </div>
                </div>

                <div className="relative h-32 flex items-end justify-center mb-4">
                    {/* Arc Visualization */}
                    <div className="absolute w-48 h-24 border-t-2 border-r-2 border-l-2 border-white/20 rounded-t-full top-4"></div>
                    <div className="absolute w-48 h-24 border-t-2 border-r-2 border-l-2 border-yellow-400/50 rounded-t-full top-4 clip-path-half"></div>

                    <div className="w-full flex justify-between px-4 text-sm text-white/60">
                        <div className="flex flex-col items-center">
                            <span className="text-white font-medium">6:12 AM</span>
                            <span className="text-xs">Sunrise</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-white font-medium">8:45 PM</span>
                            <span className="text-xs">Sunset</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Humidity Card */}
            <div className="glass-card rounded-3xl p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white/60">
                        <Droplets className="w-4 h-4" />
                        <span className="text-sm font-medium">Humidity</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{data.humidity}%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                    <div
                        className="bg-blue-400 h-full rounded-full"
                        style={{ width: `${data.humidity}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
