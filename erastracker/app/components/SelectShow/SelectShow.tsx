"use client";
import React, { useEffect, useState } from 'react';

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
    const [embedKey, setEmbedKey] = useState<number>(0); // To force re-render of Instagram embed
    const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/metadata.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setShows(data.shows);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDate = event.target.value;
        const show = shows.find(s => s.date === selectedDate) || null;
        setSelectedShow(show);
        setEmbedKey(prevKey => prevKey + 1); // Change the key to force re-render
    };

    useEffect(() => {
        // Ensure Instagram embeds are refreshed after changing the selected show
        if (selectedShow?.instagramUrl) {
            const script = document.createElement('script');
            script.async = true;
            script.src = "//www.instagram.com/embed.js";
            document.body.appendChild(script);
            
            script.onload = () => {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            };

            return () => {
                document.body.removeChild(script); // Clean up script on unmount
            };
        }
    }, [embedKey, selectedShow]);

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const nextShow = shows.find(show => new Date(show.date) > now); // Find the next show after the current date

            if (nextShow) {
                const showDate = new Date(nextShow.date);
                const timeDifference = showDate.getTime() - now.getTime();

                if (timeDifference > 0) {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                    setCountdown({ days, hours, minutes, seconds });
                } else {
                    setCountdown(null); // No upcoming show
                }
            }
        };

        calculateCountdown(); // Initial calculation

        const countdownInterval = setInterval(calculateCountdown, 1000); // Update countdown every second

        return () => clearInterval(countdownInterval); // Cleanup interval on unmount
    }, [shows]);

    return (
        <div className='artboard artboard-horizontal'>
            <div className="flex w-full flex-col items-center justify-center gap-4 place-items-stretch">
                <div className="prose p-6 font-mono"><h2>Select Your Show</h2></div>
                
                <select
                    className="prose select select-primary w-full max-w-lg"
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
                    <div className="flex flex-col lg:flex-row">
                        <div className="card card-side rounded-box border-2 border-inherit shadow-xl m-4">
                            <div>
                                <div className="prose m-4">
                                    {selectedShow.instagramUrl && (
                                        <div className="instagram-post" key={embedKey}>
                                            <blockquote 
                                                className="instagram-media" 
                                                data-instgrm-permalink={selectedShow.instagramUrl} 
                                                data-instgrm-version="14" 
                                                style={{ margin: "1px auto", width: "100%" }}>
                                            </blockquote>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="prose card-body font-serif">
                                <div>
                                    <h2 className="text-lg font-bold mb-3">⭐ Show Details ⭐</h2>
                                    <p className='mt-2 oldstyle-nums'>📆&nbsp;&nbsp;{selectedShow.date}</p>
                                    <p className='mt-2'>📍&nbsp;&nbsp;{selectedShow.city}{selectedShow.state ? `, ${selectedShow.state}` : ""}, {selectedShow.country}</p>
                                    <p className='mt-2'><strong>Surprise Songs:</strong></p>
                                    <p className='mt-1 italic'>🎸&nbsp;&nbsp;{selectedShow.surpriseSongs.acoustic.join(", ")}</p>
                                    <p className='mt-1 italic'>🎹&nbsp;&nbsp;{selectedShow.surpriseSongs.piano.join(", ")}</p>
                                    <p className='mt-2'><strong>Opening Artist:</strong> {selectedShow.opening || "No guest"}</p>
                                    <p className='mt-2'><strong>Special Guest:</strong> {selectedShow.guest || "No guest"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="prose p-6 font-mono"><h2>Next Show In</h2></div>
                <div> 
                    {countdown ? (
                        <div className="flex gap-5">
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": countdown.days } as React.CSSProperties}></span>
                                </span>
                                days
                            </div>
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": countdown.hours } as React.CSSProperties}></span>
                                </span>
                                hours
                            </div>
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": countdown.minutes } as React.CSSProperties}></span>
                                </span>
                                min
                            </div>
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": countdown.seconds } as React.CSSProperties}></span>
                                </span>
                                sec
                            </div>  
                        </div>
                    ) : (
                        <p className='prose'>No upcoming shows.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectShow;
