'use client';

import { motion } from 'framer-motion';

interface WeatherAnimationProps {
    condition: string;
    isDay: boolean;
}

export default function WeatherAnimation({ condition, isDay }: WeatherAnimationProps) {
    // Cloud layers for parallax depth
    const renderClouds = () => (
        <>
            {/* Back Layer - Slow */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.4 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] right-[20%] w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
            </motion.div>

            {/* Middle Layer - Medium */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`cloud-mid-${i}`}
                        initial={{ x: -200 }}
                        animate={{ x: '120vw' }}
                        transition={{
                            duration: 40 + i * 10,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 5,
                        }}
                        className="absolute top-[20%] w-[400px] h-[200px] bg-white/10 rounded-full blur-[80px]"
                        style={{ top: `${20 + i * 15}%` }}
                    />
                ))}
            </div>

            {/* Front Layer - Fast & Sharper */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={`cloud-front-${i}`}
                        initial={{ x: -200 }}
                        animate={{ x: '120vw' }}
                        transition={{
                            duration: 25 + i * 8,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 10,
                        }}
                        className="absolute w-[300px] h-[150px] bg-white/20 rounded-full blur-[60px]"
                        style={{ top: `${40 + i * 20}%` }}
                    />
                ))}
            </div>
        </>
    );

    const renderRain = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(100)].map((_, i) => (
                <motion.div
                    key={`rain-${i}`}
                    initial={{ y: -20, x: Math.random() * 100 + '%' }}
                    animate={{ y: '120vh' }}
                    transition={{
                        duration: 0.8 + Math.random() * 0.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 2,
                    }}
                    className="absolute w-[1px] h-8 bg-blue-200/40"
                    style={{ left: `${Math.random() * 100}%` }}
                />
            ))}
        </div>
    );

    const renderSun = () => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-[20%] right-[10%] w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[120px]"
            />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent mix-blend-overlay" />
        </div>
    );

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Base Atmosphere */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${isDay ? 'bg-blue-900/20' : 'bg-slate-900/40'
                }`} />

            {condition === 'Rain' && renderRain()}
            {(condition === 'Clouds' || condition === 'Fog' || condition === 'Rain') && renderClouds()}
            {condition === 'Clear' && isDay && renderSun()}

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[var(--bg-dark)]/80" />
        </div>
    );
}
