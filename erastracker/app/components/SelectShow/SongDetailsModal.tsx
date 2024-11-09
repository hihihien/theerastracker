import React, { useEffect, useState } from 'react'

interface Performance {
    date: string;
    city: string;
    country: string;
}

interface SongDetails {
    name: string;
    album: string;
    play_count: string;
    is_fixed: boolean;
    note: string;
    performances: Performance[];
}

interface SongDetailsModalProps {
    songName: string;
    onClose: () => void;
}

const SongDetailsModal: React.FC<SongDetailsModalProps> = ({ songName, onClose }) => {
    const [songDetails, setSongDetails] = useState<SongDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const response = await fetch(`/api/song/${encodeURIComponent(songName)}`);
                if (!response.ok) throw new Error('Song not found');

                const data = await response.json();
                setSongDetails(data);

            } catch (err) {
                setError(err instanceof Error ? err.message: 'AN unexpected error occured');
            } finally {
                setLoading(false);
            }
        };

        fetchSongDetails();
    }, [songName]);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

  return (
    <div className=''>
        <div className=''>
            <button onClick={onClose}>&times; Close</button>
            <h2>{songDetails?.name}</h2>
            <p>Album: {songDetails?.album}</p>
            <p>Played {songDetails?.play_count} times</p>
            <p>Note: {songDetails?.note}</p>
            <h3>Performance History</h3>
            <ul>
                {songDetails?.performances?.length ? (
                    songDetails?.performances.map((performance, index) => (
                        <li key={index}>
                            {performance.date} - {performance.city}, {performance.country}
                        </li>
                    ))
                ): (
                    <p>NO performances recorded for this song.</p>
                )}
            </ul>
        </div>
    </div>
  )
}

export default SongDetailsModal;