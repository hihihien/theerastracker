const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('./public/song.db');

//api endpoint
app.get('/api/song/:name', (req, res) => {
    const songName = req.params.name;

    db.all(`
        SELECT s.name, s.play_count, s_album, s.is_fixed, s.note, p.performance_date, p.city, p.country
        FROM songs s
        LEFT JOIN song_performances p ON s.id = p.song_id
        WHERE s.name = ?
        ORDER BY p.performance_date;
        `, [songName], (err, rows) => {
            if (err) {
                return res.status(500).json({error: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({ error: "Song not found"});
            }

            const songDetails = {
                name: rows[0].name,
                album: rows[0].album,
                play_count: rows[0].play_count,
                is_fixed: rows[0].is_fixed,
                note: rows[0].note,
                performances: rows.map(row => ({
                    date: row.performance_date,
                    city: row.city,
                    country: row.country
                }))
            };
            res.json(songDetails);
        });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});