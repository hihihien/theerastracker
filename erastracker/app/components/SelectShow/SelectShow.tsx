"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import speaknow from '../../../public/img/speaknow.jpg'

interface SurpriseSongs {
    acoustic: string;
    piano: string;
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
    country: string;
    surpriseSongs: SurpriseSongs;
    guest: string;
    costumes: Costumes;
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
                    <div className="card card-side size-140 border-2 border-inherit shadow-xl mt-4 prose-img:rounded-l-lg">
                        <figure>
                            <Image
                            src={speaknow}
                            alt="surprise song img" />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-lg font-bold mb-2">⭐ Show Details ⭐</h2>
                            <p><strong>Surprise Songs:</strong></p>
                            <p>🎸 Acoustic: {selectedShow.surpriseSongs.acoustic}</p>
                            <p>🎹 Piano: {selectedShow.surpriseSongs.piano}</p>
                            <p className='mt-2'><strong>Guest:</strong> {selectedShow.guest}</p>
                            <p className='mt-2'><strong>Watch:</strong></p>
                        </div>
                        
                    </div>
                    
                    
                )}
        </div>
    </div>
);

};

export default SelectShow;
