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
            const response = await fetch("../../../public/metadata.json");
            const data = await response.json();
            setShows(data.shows);
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
                    {shows.map((show, index) => (
                        <option key={index} value={show.date}>
                            {`${show.date} - ${show.city}, ${show.country}`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectShow;
