import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./public/songs.db');

export async function GET() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT DISTINCT album FROM songs ORDER BY album;`, [], (err, rows) => {
            if (err) {
                reject(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                const albums = rows.map(row => row.album);
                resolve(NextResponse.json(albums, { status: 200 }));
            }
        });
    });
}
