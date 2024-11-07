const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./public/songs.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE,
            album TEXT,
            play_count INTEGER DEFAULT 0,
            is_fixed BOOLEAN DEFAULT FALSE,
            note TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS song_performances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            song_id INTEGER,
            performance_date DATE,
            city TEXT, 
            country TEXT,
            FOREIGN KEY (song_id) REFERENCES songs(id)
        );
    `);

    console.log("Database tables created successfully.")
});

db.close();