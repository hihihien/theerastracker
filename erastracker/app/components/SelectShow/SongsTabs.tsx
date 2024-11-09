import React, { useEffect, useState } from 'react';

interface Song {
    name: string;
    album: string;
    play_count: number;
    is_fixed: boolean;
    note: string;
}

interface SongsTabsProps {
    selectedAlbum: string;
}

const SongsTabs: React.FC<SongsTabsProps> = ({selectedAlbum}) => {
    const [allSongs, setAllSongs] = useState<Song[]>([]);
    const [playedSongs, setPlayedSongs] = useState<Song[]>([]);
    const [notYetPlayedSongs, setNotYetPlayedSongs] = useState<Song[]>([]);
    const [fixedSongs, setFixedSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch song data and categorize them
        const fetchSongsData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/songs');
                if (!response.ok) throw new Error('Failed to fetch songs');
                
                const songs = await response.json();

                setAllSongs(songs);
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongsData();
    }, []);

    useEffect(() => {
        // Fetch song data and categorize them
        const albumSongs = allSongs.filter(song => song.album === selectedAlbum);

        setPlayedSongs(albumSongs.filter(song => !song.is_fixed && song.play_count > 0));
        setNotYetPlayedSongs(albumSongs.filter(song => !song.is_fixed && song.play_count === 0));
        setFixedSongs(albumSongs.filter(song => song.is_fixed));

    }, [selectedAlbum, allSongs]);

    if (loading) return <div>Loading songs...</div>;

    return (
        <div className='flex flex-col items-center w-full m-6'>
            
            <div role="tablist" className="tabs tabs-lifted w-full max-w-6xl justify-center">
            {/* Tab for Played Songs */}
            <input 
                type="radio" 
                name="my_tabs_2" 
                role="tab" 
                className="tab tab-lg prose text-wrap" 
                aria-label="Played" 
            />
            <div role="tabpanel" className="prose tab-content bg-base-100 border-base-300 rounded-box p-2 w-full">
                <h4 className='text-center'>Played songs in {selectedAlbum}</h4>
                <ul>
                    {playedSongs.length > 0 ? (
                        playedSongs.map((song, index) => (
                            <li key={index}>
                                {song.name} {song.play_count > 1 ? `(x${song.play_count})` : ''}
                            </li>
                        ))
                    ) : (
                        <p className='text-center'>No played songs.</p>
                    )}
                </ul>
            </div>

            {/* Tab for Not Yet Played Songs */}
            <input
                type="radio"
                name="my_tabs_2" 
                role="tab" 
                className="tab tab-lg prose" 
                aria-label="Not Played"
                defaultChecked
            />
            <div role="tabpanel" className="prose tab-content bg-base-100 border-base-300 rounded-box p-2 w-full">
                <h4 className='text-center'>Not yet played songs in {selectedAlbum}</h4>
                <ul>
                    {notYetPlayedSongs.length > 0 ? (
                        notYetPlayedSongs.map((song, index) => (
                            <li key={index}>{song.name}</li>
                        ))
                    ) : (
                        <p className='text-center'>All songs have been played.</p>
                    )}
                </ul>
            </div>

            {/* Tab for Fixed Songs */}
            <input 
                type="radio"
                name="my_tabs_2" 
                role="tab" 
                className="tab tab-lg prose" 
                aria-label="Fixed in Setlist" 
            />
            <div role="tabpanel" className="prose tab-content bg-base-100 border-base-300 rounded-box p-2 w-full">
                <h4 className='text-center'>Fixed songs in setlist in {selectedAlbum}</h4>
                <ul>
                    {fixedSongs.length > 0 ? (
                        fixedSongs.map((song, index) => (
                            <li key={index}>{song.name}</li>
                        ))
                    ) : (
                        <p className='text-center'>No fixed songs in setlist.</p>
                    )}
                </ul>
            </div>
        </div>
        </div>
        
    );
};

export default SongsTabs;
