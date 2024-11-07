const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./public/songs.db');

const songsData = JSON.parse(fs.readFileSync('./src/data/songsData.json', 'utf-8'));
const metadata = JSON.parse(fs.readFileSync('./public/metadata.json', 'utf-8'));

function runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) reject(err);
            else resolve(this); 
        });
    });
}

// function to get data as promises
function getQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function seedDatabase() {
    try {
        for (const song of songsData.songs) {
            await runQuery(`
                INSERT INTO songs (name, album, is_fixed, play_count, note)
                VALUES (?, ?, ?, 0, ?)
                ON CONFLICT(name) DO NOTHING;
            `, [song.name, song.album, song.is_fixed, song.note]);
        }

        // loop over each show to add performances and update counts
        for (const show of metadata.shows) {
            const showDate = show.date;
            const city = show.city;
            const country = show.country;

            const surpriseSongs = [
                ...show.surpriseSongs.acoustic,
                ...show.surpriseSongs.piano
            ];

            for (const songName of surpriseSongs) {
                await runQuery(`UPDATE songs SET play_count = play_count + 1 WHERE name = ?;`, [songName]);

                const song = await getQuery(`SELECT id FROM songs WHERE name = ?;`, [songName]);
                
                if (song) {
                    await runQuery(`
                        INSERT INTO song_performances (song_id, performance_date, city, country)
                        VALUES (?, ?, ?, ?);
                    `, [song.id, showDate, city, country]);
                }
            }
        }

        console.log("Database seeded with song data.");
    } catch (error) {
        console.error("Error seeding database:", error.message);
    } finally {
        // Close the database connection
        db.close((err) => {
            if (err) console.error("Error closing the database:", err.message);
            else console.log("Database connection closed successfully.");
        });
    }
}

seedDatabase();
