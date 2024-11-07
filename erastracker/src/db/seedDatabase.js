const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./public/songs.db');

const songsData = JSON.parse(fs.readFileSync('./src/data/songsData.json', 'utf-8'));
const metadata = JSON.parse(fs.readFileSync('./public/metadata.json', 'utf-8'));

let pendingQueries = 0;

function closeDatabase() {
    if (pendingQueries === 0) {
        db.close((err) => {
            if (err) {
                console.error("Error closing the database:", err.message);
            } else {
                console.log("Database seeded with song data and closed successfully.");
            }
        });
    }
}

db.serialize(() => {
    // Insert songs from JSON
    songsData.songs.forEach(song => {
        pendingQueries++;
        db.run(`
            INSERT INTO songs(name, album, is_fixed, play_count, note)
            VALUES (?, ?, ?, 0, ?)
            ON CONFLICT(name) DO NOTHING;
        `, [song.name, song.album, song.is_fixed, song.note], (err) => {
            if (err) {
                console.error("Error inserting song:", err.message);
            }
            pendingQueries--;
            closeDatabase();
        });
    });

    // Loop over each show to add performances and counts
    metadata.shows.forEach(show => {
        const showDate = show.date;
        const city = show.city;
        const country = show.country;

        const surpriseSongs = [
            ...show.surpriseSongs.acoustic,
            ...show.surpriseSongs.piano
        ];

        surpriseSongs.forEach(songName => {
            pendingQueries++;
            db.run(`
                UPDATE songs SET play_count = play_count + 1 WHERE name = ?;
            `, [songName], (err) => {
                if (err) {
                    console.error("Error updating play count:", err.message);
                    pendingQueries--;
                    closeDatabase();
                    return;
                }
            
                pendingQueries++;
                db.get(`SELECT id FROM songs WHERE name = ?`, [songName], (err, song) => {
                    if (err) {
                        console.error("Error retrieving song ID:", err.message);
                        pendingQueries--;
                        closeDatabase();
                        return;
                    }
                    if (song) {
                        db.run(`
                            INSERT INTO song_performances (song_id, performance_date, city, country)
                            VALUES (?,?,?,?);
                        `, [song.id, showDate, city, country], (err) => {
                            if (err) {
                                console.error("Error inserting performance:", err.message);
                            }
                            pendingQueries--;
                            closeDatabase();
                        });
                    } else {
                        pendingQueries--;
                        closeDatabase();
                    }
                });
            });
        });
    });
});
