import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
    `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game TEXT,
    score INTEGER
)`).run()

db.prepare(
    `INSERT INTO scores (game, score) VALUES 
    ('MINECRAFT', 500),
    ('GTAV', 1500),
    ('BF2042', 5500),
    ('FIFA32', 100);`).run();

export const getAllScores = () => db.prepare('SELECT * from scores').all();
export const getScorebyId = (id) => db.prepare('SELECT * from scores where id = ?').get(id);
export const createScore = (game, score) => db.prepare('INSERT INTO scores (game, score) VALUES (?,?)').run(game, score);
export const deleteScore = (id) => db.prepare('DELETE FROM scores where id = ?').run(id);


