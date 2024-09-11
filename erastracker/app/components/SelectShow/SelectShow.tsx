"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import speaknow from '../../../public/img/speaknow.jpg'

interface SurpriseSongs {
    acoustic: string[];
    piano: string[];
}

interface Costumes {
    loverSet: string;
    theManSuit: string;
    nineSet: string;
    folkloreDress: string;
}

interface Show {
    date: string;
    city: string;
    state: string;
    opening: string;
    country: string;
    surpriseSongs: SurpriseSongs;
    guest?: string; 
    costumes?: Costumes;  
    instagramUrl?: string;
}

const SelectShow: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/metadata.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched Data:", data); // Log the fetched data
                setShows(data.shows);
            } catch (error) {
                console.error("Fetch error:", error); // Log any fetch errors
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDate = event.target.value;
        const show = shows.find(s => s.date === selectedDate) || null;
        setSelectedShow(show);
    };

    return (
        <div className='artboard artboard-horizontal'>
            <div className="flex w-full flex-col items-center justify-center gap-4 place-items-stretch">
                <div className="prose p-6"><h2>Select Your Show</h2></div>
                
                <select
                    className="select select-primary w-full max-w-xs"
                    onChange={handleSelectChange}
                    value={selectedShow ? selectedShow.date : ""}
                >
                    <option disabled value="">
                        Choose your show
                    </option>
                    {shows.length === 0 ? (
                        <option disabled>Loading shows...</option>
                    ) : (
                        shows.map((show, index) => (
                            <option key={index} value={show.date}>
                                {`${show.date} - ${show.city}, ${show.country}`}
                            </option>
                        ))
                    )}
                </select>
                {selectedShow && (
                    <div className="flex w-full flex-col lg:flex-row">
                        <div className="card card-side size-400 rounded-box border-2 border-inherit shadow-xl m-4">
                            <div>
                                <div className="m-4">
                                        {selectedShow.instagramUrl && (
                                            <div className="instagram-post">
                                                <blockquote className="instagram-media" data-instgrm-permalink={selectedShow.instagramUrl} data-instgrm-version="14" style={{ margin: "1px auto", width: "100%" }}></blockquote>
                                                <script async src="//www.instagram.com/embed.js"></script>
                                            </div>
                                        )}
                                    </div>
                            </div>
                            <div className="card-body antialiased md:subpixel-antialiased font-serif">
                                <div>
                                    <h2 className="text-lg font-bold mb-3">⭐ Show Details ⭐</h2>
                                    <p className='mt-2 oldstyle-nums'>📆&nbsp;&nbsp;{selectedShow.date}</p>
                                    <p className='mt-2'>📍&nbsp;&nbsp;{selectedShow.city}{selectedShow.state ? `, ${selectedShow.state}` : ""}, {selectedShow.country}</p>
                                    <p className='mt-2'><strong>Surprise Songs:</strong></p>
                                    <p className='mt-1 italic'>🎸&nbsp;&nbsp;{selectedShow.surpriseSongs.acoustic.join(", ")}</p>
                                    <p className='mt-1 italic'>🎹&nbsp;&nbsp;{selectedShow.surpriseSongs.piano.join(", ")}</p>
                                    <p className='mt-2'><strong>Opening Artist:</strong> {selectedShow.opening || "No guest"}</p>
                                    <p className='mt-2'><strong>Special Guest:</strong> {selectedShow.guest || "No guest"}</p>
                                    <p className='mt-2'><strong>Watch:</strong></p>
                                        
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectShow;
