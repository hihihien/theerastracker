import React from 'react';

interface SurpriseSongs {
    acoustic: string[];
    piano: string[];
}

interface Show {
    date: string;
    city: string;
    state: string;
    opening: string;
    country: string;
    surpriseSongs: SurpriseSongs;
    guest?: string; 
}

interface LastSurpriseSongsProps {
    lastShow: Show | null;
}

const LastSurpriseSongs: React.FC<LastSurpriseSongsProps> = ({ lastShow }) => {
    if (!lastShow) {
        return null; // or return a message indicating no last show
    }

    return (
        <div className="prose p-6 font-mono">
            <h2 className="text-lg font-bold mb-3">🎶 Last Surprise Songs 🎶</h2>
            <p className='mt-2 oldstyle-nums'>📆&nbsp;&nbsp;{lastShow.date}</p>
            <p className='mt-2'>📍&nbsp;&nbsp;{lastShow.city}{lastShow.state ? `, ${lastShow.state}` : ""}, {lastShow.country}</p>
            <p className='mt-2'><strong>Surprise Songs:</strong></p>
            <p className='mt-1 italic'>🎸&nbsp;&nbsp;{lastShow.surpriseSongs.acoustic.join(", ")}</p>
            <p className='mt-1 italic'>🎹&nbsp;&nbsp;{lastShow.surpriseSongs.piano.join(", ")}</p>
            <p className='mt-2'><strong>Opening Artist:</strong> {lastShow.opening || "No guest"}</p>
            <p className='mt-2'><strong>Special Guest:</strong> {lastShow.guest || "No guest"}</p>
        </div>
    );
};

export default LastSurpriseSongs;
