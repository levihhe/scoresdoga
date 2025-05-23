import e from "express";
import * as db from "./util/database.js"

const PORT = 8080;
const app = e();
app.use(e.json());

app.get("/scores", (req,res) => {
    try {
        const scores = db.getAllScores();
        res.status(200).json(scores);
    }catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.get("/scores/:id", (req,res) => {
    try {
        const score = db.getScorebyId(req.params.id);
        if (!score) {
            return res.status(404).json({message:"Score not found"})
        }
        res.status(200).json(score);
    }catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.post("/scores", (req,res) => {
    try {
        const {game, score} = req.body;
        if (!game || !score) {
            return res.status(400).json({message:"Invalid credentials"})
        }
        const savedScore = db.createScore(game, score);
        if (savedScore.changes != 1) {
            return res.status(400).json({message:"Save error"})
        }
        res.status(201).json({id: savedScore.lastInsertRowid, game, score})
    }catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.delete("/scores/:id", (req,res) => {
    try {
        const deletedScore = db.deleteScore(req.params.id);
        if(deletedScore.changes != 1) {
            return res.status(404).json({message:"Id not found"});
        }
        res.status(204).json({message:"No content"})
    }catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.listen(PORT, () => console.log("Port runs on:8080"))