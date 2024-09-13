"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
    const [nextShow, setNextShow] = useState<Show | null>(null);
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

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

    // Function to calculate the time remaining
    const calculateTimeRemaining = (targetDate: Date) => {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        const difference = target - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };

    // Function to find the next show date
    const findNextShow = (shows: Show[]) => {
        const now = new Date();
        const futureShows = shows
            .map(show => ({
                ...show,
                date: new Date(show.date) // convert date string to Date object
            }))
            .filter(show => show.date > now); // filter shows that are in the future

        if (futureShows.length > 0) {
            return futureShows.sort((a, b) => a.date.getTime() - b.date.getTime())[0];
        }

        return null; // No upcoming shows
    };

    useEffect(() => {
        if (shows.length > 0) {
            const next = findNextShow(shows);
            setNextShow(next);
        }
    }, [shows]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (nextShow) {
            intervalId = setInterval(() => {
                const remainingTime = calculateTimeRemaining(new Date(nextShow.date));
                setTimeRemaining(remainingTime);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [nextShow]);

    return (
        <div className='artboard artboard-horizontal antialiased md:subpixel-antialiased'>
            <div className="flex w-full flex-col items-center justify-center gap-4 place-items-stretch">
                <div className="prose p-6 font-mono"><h2>Next Show In</h2></div>
                {nextShow ? (
                    <div>
                        <div className="flex gap-5">
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": timeRemaining.days } as React.CSSProperties}></span>
                                </span>
                                days
                            </div>
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": timeRemaining.hours } as React.CSSProperties}></span>
                                </span>
                                hours
                            </div>
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": timeRemaining.minutes } as React.CSSProperties}></span>
                                </span>
                                min
                            </div>
                            <div>
                                <span className="countdown font-mono text-4xl">
                                    <span style={{ "--value": timeRemaining.seconds } as React.CSSProperties}></span>
                                </span>
                                sec
                            </div>
                        </div>
                        <div className="prose p-6 font-mono"><h2>Next Show: {nextShow.city}, {nextShow.country} on {nextShow.date.toDateString()}</h2></div>
                    </div>
                ) : (
                    <div>No upcoming shows available</div>
                )}
            </div>
        </div>
    );
};

export default SelectShow;
