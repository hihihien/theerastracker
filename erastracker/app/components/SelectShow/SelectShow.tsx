"use client";
import React, { useEffect, useState } from 'react';
import LastSurpriseSongs from './LastSurpriseSongs';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css"; 

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
    const [nextShow, setNextShow] = useState<Show | null>(null);
    const [lastShow, setLastShow] = useState<Show | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

    useEffect(() => {
        const fetchLastShow = () => {
            const now = new Date();
            const pastShows = shows
                .map(show => ({ ...show, date: new Date(show.date) }))
                .filter(show => show.date <= now)
                .sort((a, b) => b.date.getTime() - a.date.getTime());

            const mostRecentShow = pastShows[0] || null;

            // Convert date back to string before setting the last show
            if (mostRecentShow) {
                setLastShow({ ...mostRecentShow, date: mostRecentShow.date.toISOString() });
            } else {
                setLastShow(null);
            }
        };

        fetchLastShow();
    }, [shows]);

    useEffect(() => {
        if (selectedDate) {
            const selectedDateString = selectedDate.toISOString().split('T')[0];
            const show = shows.find(s => s.date.startsWith(selectedDateString)) || null;
            setSelectedShow(show);
            setEmbedKey(prevKey => prevKey + 1);
        }
    }, [selectedDate, shows]);

    useEffect(() => {
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
                document.body.removeChild(script); 
            };
        }
    }, [embedKey, selectedShow]);

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const upcomingShows = shows
                .map(show => ({ ...show, date: new Date(show.date).toISOString() })) 
                .filter(show => new Date(show.date) > now) 
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
            const nextShow = upcomingShows.length > 0 ? upcomingShows[0] : null; 
            setNextShow(nextShow); 
        
            console.log('Next Show:', nextShow); // check the next show data
        
            if (nextShow) {
                const showDate = new Date(nextShow.date); 
                const timeDifference = showDate.getTime() - now.getTime();
        
                if (timeDifference > 0) {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
                    setCountdown({ days, hours, minutes, seconds });
                }
            } else {
                setCountdown(null);
            }
        };
    
        calculateCountdown(); 
    
        const countdownInterval = setInterval(calculateCountdown, 1000); // update countdown every second
    
        return () => clearInterval(countdownInterval); 
    }, [shows]); 
    
    
    
    // this part for formatting date 
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
        <div className='artboard artboard-horizontal'>
            <div className="flex w-full flex-col items-center justify-center gap-4 place-items-stretch">
                <div>
                    <p className="prose italic mt-2 font-mono text-center">choose your fav <a className="no-underline">theme</a> by clicking on images above</p>
                </div>
                <LastSurpriseSongs lastShow={lastShow} />
                <div className="prose p-6 font-mono"><h2>Select Your Show</h2></div>
                
                <DatePicker
                    selected={selectedShow ? new Date(selectedShow.date) : null}
                    onChange={(date) => {
                        if (date) {
                            const foundShow = shows.find(show => new Date(show.date).toDateString() === date.toDateString());
                            setSelectedShow(foundShow || null); 
                        } else {
                            setSelectedShow(null); 
                        }
                    }}
                    inline
                    className="w-full max-w-xs"
                    calendarClassName="rounded-lg shadow-inner shadow-2xl"
                    dayClassName={(date) => {
                        const formattedDate = date.toISOString().slice(0, 10); 
                        const concertDates = new Set(shows.map(show => show.date)); //map all cc dates

                        const isConcertDate = concertDates.has(formattedDate);
                        const isToday = date.toDateString() === new Date().toDateString();

                        let classNames = 'btn btn-sm btn-outline';

                        if (isConcertDate) {
                            classNames += ' bg-success text-white'; 
                        }

                        if (isToday) {
                            classNames += ' bg-warning text-base-100 ';
                        }

                        return classNames;
                    }}
                />

                {selectedShow && (
                    <div className="card rounded-box border-2 border-inherit shadow-xl m-4 flex flex-col lg:flex-row">
                        {/* Instagram Embed Section */}
                        <div className="w-full lg:w-1/2 content-center">
                            {selectedShow.instagramUrl && (
                                <div className="prose m-4 instagram-post content-center" key={embedKey}>
                                    <blockquote
                                        className="instagram-media"
                                        data-instgrm-permalink={selectedShow.instagramUrl}
                                        data-instgrm-version="14"
                                        style={{ margin: "1px auto", width: "100%" }}
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Card Body Section */}
                        <div className="prose text-center card-body font-serif w-full lg:w-1/2">
                            <h2 className="text-lg font-bold mb-3">⭐ Show Details ⭐</h2>
                            <p className='mt-2 oldstyle-nums'>📆&nbsp;&nbsp;{formatDateWithSuffix(selectedShow.date)}</p>
                            <p className='mt-2'>📍&nbsp;&nbsp;{selectedShow.city}{selectedShow.state ? `, ${selectedShow.state}` : ""}, {selectedShow.country}</p>
                            <p className='mt-2'><strong>Surprise Songs:</strong></p>
                            <p className='mt-1 italic'>🎸&nbsp;&nbsp;{selectedShow.surpriseSongs.acoustic.join(", ")}</p>
                            <p className='mt-1 italic'>🎹&nbsp;&nbsp;{selectedShow.surpriseSongs.piano.join(", ")}</p>
                            <p className='mt-2'><strong>Opening Artist:</strong> {selectedShow.opening || "No guest"}</p>
                            <p className='mt-2'><strong>Special Guest:</strong> {selectedShow.guest || "No guest"}</p>
                        </div>
                    </div>
                )}


                <div className="prose flex p-6 font-mono text-secondary-content"><h2>Next Show In</h2></div>
                    {countdown ? (
                        <div className="flex content-center gap-5 prose">
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
                    {nextShow && (
                        <div className='flex'>
                            <p className="prose p-6 font-mono">
                            On <a className='text-secondary no-underline'>{formatDateWithSuffix(nextShow.date)}</a> in <a className='no-underline text-secondary'>{nextShow.city}, {nextShow.country}</a>
                            </p>
                        </div>
                    )}
                
            </div>
        </div>
    );
};

export default SelectShow;
