'use client';

import { useEffect, useState } from 'react';
import { Trash2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Favorite {
    id: number;
    city_name: string;
    latitude: number;
    longitude: number;
}

interface FavoritesListProps {
    onSelect: (city: string) => void;
    refreshTrigger?: number;
}

export default function FavoritesList({ onSelect, refreshTrigger }: FavoritesListProps) {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const res = await fetch('/api/weather/favorites');
            const data = await res.json();
            if (data.favorites) {
                setFavorites(data.favorites);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [refreshTrigger]);

    const removeFavorite = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            await fetch('/api/weather/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            setFavorites(favorites.filter(fav => fav.id !== id));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (loading) {
        return <div className="text-white/60 text-center py-4">Loading favorites...</div>;
    }

    if (favorites.length === 0) {
        return (
            <div className="text-white/40 text-center py-8 glass-panel rounded-2xl">
                <p>No favorite cities yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="text-white/80 font-medium mb-4 px-2">Saved Locations</h3>
            <AnimatePresence>
                {favorites.map((fav) => (
                    <motion.div
                        key={fav.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={() => onSelect(fav.city_name)}
                        className="group flex items-center justify-between p-4 rounded-xl glass-panel hover:bg-white/10 cursor-pointer transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-white/60" />
                            <span className="text-white font-medium">{fav.city_name}</span>
                        </div>
                        <button
                            onClick={(e) => removeFavorite(e, fav.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-200 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
