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
        return <p>No last show available.</p>;
    }

    // formatting date
    const formatDateWithSuffix = (dateString: string): string => {
        const showDate = new Date(dateString);
        const year = showDate.getFullYear();
        const month = showDate.toLocaleString('default', { month: 'long' });
        const day = showDate.getDate();

        const getDayWithSuffix = (day: number): string => {
            if (day > 3 && day < 21) return `${day}th`;
            switch (day % 10) {
                case 1: return `${day}st`;
                case 2: return `${day}nd`;
                case 3: return `${day}rd`;
                default: return `${day}th`;
            }
        };

        return `${getDayWithSuffix(day)} ${month} ${year}`;
    };

    return (
        <div className="prose p-6 font-mono text-center mt-4">
            <h2 className="font-bold mb-4">🎶 about the last show 🎶</h2>
            <p className='mt-2 oldstyle-nums'>📆&nbsp;&nbsp;{formatDateWithSuffix(lastShow.date)}</p>
            <p className='mt-2'>📍&nbsp;&nbsp;{lastShow.city}{lastShow.state ? `, ${lastShow.state}` : ""}, {lastShow.country}</p>
            <p className='mt-2'><strong>Surprise Songs:</strong></p>
            <p className='mt-1 italic'>🎸&nbsp;&nbsp;{lastShow.surpriseSongs.acoustic.join(" & ")}</p>
            <p className='mt-1 italic'>🎹&nbsp;&nbsp;{lastShow.surpriseSongs.piano.join(" & ")}</p>
            <p className='mt-2'><strong>Opening Artist:</strong> {lastShow.opening || "No guest"}</p>
            <p className='mt-2'><strong>Special Guest:</strong> {lastShow.guest || "No guest"}</p>
        </div>
    );
};

export default LastSurpriseSongs;
