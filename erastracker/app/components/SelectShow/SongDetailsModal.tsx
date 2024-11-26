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
                setError(err instanceof Error ? err.message: 'An unexpected error occured');
            } finally {
                setLoading(false);
            }
        };

        fetchSongDetails();
    }, [songName]);

  return (
    <dialog id="song-details-modal" className='modal'>
        <div className='modal-box relative'>
            <button
                className='prose btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                onClick={()=>{
                    onClose();
                    (document.getElementById('song-details-modal') as HTMLDialogElement)?.close();
                }}
            >
                X
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                <div className='prose text-center font-serif'>
                    <div>
                        <h3 className='font-semibold italic pb-2'>{songDetails?.name}</h3>
                        <p>Album: <a className="no-underline font-bold">{songDetails?.album}</a></p>
                        <p>Played <a className='no-underline font-bold'>{songDetails?.play_count}</a> times</p>
                        <h4>Performance History:</h4>
                    </div>
                    
                    <div className='justify-items-center'>
                        <ul>
                        {songDetails?.performances?.length? (
                            songDetails?.performances.map((performance, index) => (
                                <li 
                                    className='text-left'
                                    key={index}>
                                    {performance.date} in <a className="no-underline font-bold">{performance.city}</a>, <a className="no-underline font-bold">{performance.country}</a>
                                </li>
                            ))
                        ): (
                            <p>No performances recorded for this song.</p>
                        )}
                    </ul>
                    </div>
                    
                    <p className='italic'>Note: {songDetails?.note || "no note"}</p>
                </div>
                    
                </>
            )}
        </div>
    </dialog>

  )
}

export default SongDetailsModal;