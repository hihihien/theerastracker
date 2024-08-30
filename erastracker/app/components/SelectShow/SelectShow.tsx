"use client";
import React, { useEffect, useState } from 'react';

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
    const [selectedShow, setSelectedShow] = useState<string>('');

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
        setSelectedShow(event.target.value);
    };

    return (
    <div className='artboard artboard-horizontal phone-6'>
        <div className="flex w-full flex-col">
            <div className="divider">Select Your Show</div>
            <select
                className="select select-primary w-full max-w-xs"
                onChange={handleSelectChange}
                value={selectedShow}
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
                    <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-lg font-bold mb-2">Show Details</h2>
                        <p><strong>Surprise Songs:</strong></p>
                        <p>Acoustic: {selectedShow.surpriseSongs.acoustic}</p>
                        <p>Piano: {selectedShow.surpriseSongs.piano}</p>
                        <p><strong>Guest:</strong> {selectedShow.guest}</p>
                    </div>
                )}
        </div>
    </div>
);

};

export default SelectShow;
