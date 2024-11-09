import React, { useEffect, useState } from 'react';

interface Song {
    name: string;
    album: string;
    play_count: number;
    is_fixed: boolean;
    note: string;
}

const SongsTabs: React.FC = () => {
    const [playedSongs, setPlayedSongs] = useState<Song[]>([]);
    const [notYetPlayedSongs, setNotYetPlayedSongs] = useState<Song[]>([]);
    const [fixedSongs, setFixedSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch song data and categorize them
        const fetchSongsData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/songs');  // Adjust this API endpoint as needed
                if (!response.ok) throw new Error('Failed to fetch songs');
                
                const songs = await response.json();
                console.log("Fetched Song:", songs);

                const played = songs.filter((song: Song) => song.play_count > 0);
                const notYetPlayed = songs.filter((song: Song) => song.play_count === 0);
                const fixed = songs.filter((song: Song) => song.is_fixed);

                console.log("Played songs:", songs);
                console.log("Not yet played songs:", songs);
                console.log("Fixed Songs:", songs);

                setPlayedSongs(played);
                setNotYetPlayedSongs(notYetPlayed);
                setFixedSongs(fixed);
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongsData();
    }, []);

    if (loading) return <div>Loading songs...</div>;

    return (
        <div role="tablist" className="tabs tabs-lifted">
            {/* Tab for Played Songs */}
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Played" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <h2>Played Songs</h2>
                <ul>
                    {playedSongs.length > 0 ? (
                        playedSongs.map((song, index) => (
                            <li key={index}>
                                {song.name} {song.play_count > 1 ? `(${song.play_count} times)` : ''}
                            </li>
                        ))
                    ) : (
                        <p>No played songs.</p>
                    )}
                </ul>
            </div>

            {/* Tab for Not Yet Played Songs */}
            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Not Yet Played"
                defaultChecked
            />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <h2>Not Yet Played Songs</h2>
                <ul>
                    {notYetPlayedSongs.length > 0 ? (
                        notYetPlayedSongs.map((song, index) => (
                            <li key={index}>{song.name}</li>
                        ))
                    ) : (
                        <p>All songs have been played.</p>
                    )}
                </ul>
            </div>

            {/* Tab for Fixed Songs */}
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Fixed in Setlist" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <h2>Fixed Songs in Setlist</h2>
                <ul>
                    {fixedSongs.length > 0 ? (
                        fixedSongs.map((song, index) => (
                            <li key={index}>{song.name}</li>
                        ))
                    ) : (
                        <p>No fixed songs in setlist.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SongsTabs;
