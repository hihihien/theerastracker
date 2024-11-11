import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./public/songs.db');

interface SongRow {
    name: string;
    play_count: number;
    album: string;
    is_fixed: string;
    note: string;
    performance_date: string;
    city: string;
    country: string;
}

export async function GET(request: Request, { params }: { params: { name: string } }): Promise<Response> {
    const songName = decodeURIComponent(params.name);

    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT s.name, s.play_count, s.album, s.is_fixed, s.note, p.performance_date, p.city, p.country
            FROM songs s
            LEFT JOIN song_performances p ON s.id = p.song_id
            WHERE s.name = ?
            ORDER BY p.performance_date;
            `,
            [songName],
            (err, rows: SongRow[]) => {
                if (err) {
                    reject(NextResponse.json({ error: err.message }, { status: 500 }));
                } else if (rows.length === 0) {
                    resolve(NextResponse.json({ error: 'Song not found' }, { status: 404 }));
                } else {
                    const songDetails = {
                        name: rows[0].name,
                        album: rows[0].album,
                        play_count: rows[0].play_count,
                        is_fixed: rows[0].is_fixed,
                        note: rows[0].note,
                        performances: rows.map((row: SongRow) => ({
                            date: row.performance_date,
                            city: row.city,
                            country: row.country,
                        })),
                    };
                    resolve(NextResponse.json(songDetails, { status: 200 }));
                }
            }
        );
    });
}
