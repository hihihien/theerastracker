import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./public/songs.db');

export async function GET() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT name, album, play_count, is_fixed, note FROM songs;`, [], (err, rows) => {
            if (err) {
                reject(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows, { status: 200 }));
            }
        });
    });
}
