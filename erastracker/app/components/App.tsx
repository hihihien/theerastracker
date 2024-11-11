'use client';
import React, { useState } from 'react';
import Hero from './Hero/Hero';
import SongsTabs from './SelectShow/SongsTabs';
import SelectShow from './SelectShow/SelectShow';

// Album names corresponding to the themes and images
const albums = [
    "Taylor Swift", "Fearless", "Speak Now", "Red", "1989", 
    "Reputation", "Lover", "folklore", "evermore", "Midnights", "The Tortured Poets Department"
];

const themes = [
    'lemonade', 'cyberpunk', 'synthwave', 'red', 'pastel',
    'black', 'valentine', 'luxury', 'retro', 'aqua', 'wireframe'
];

const App: React.FC = () => {
    const [selectedAlbum, setSelectedAlbum] = useState<string>(albums[albums.length - 1]);
    const [theme, setTheme] = useState<string>(themes[themes.length - 1]);

    const handleAlbumClick = (index: number) => {
        setSelectedAlbum(albums[index]);
        setTheme(themes[index]);
        document.documentElement.setAttribute('data-theme', themes[index]);
    };

    return (
        <div>
            <Hero onAlbumClick={handleAlbumClick} selectedTheme={theme} />
            <SongsTabs selectedAlbum={selectedAlbum} />
            <SelectShow /> 
        </div>
    );
};

export default App;
