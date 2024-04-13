const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb://localhost:27017/scoreCardDB', { useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = new mongoose.Schema({
    name: String,
    roll: String,
    attendance: Number,
    arrears: Number,
    language: String,
    skillset: [String],
    cgpa: Number,
    communication: Number,
    leadership: Number,
    criticalThinking: Number,
    onlineCourses: String,
    coursesPlatforms:[String],
    otherPlatform: String,
    projectCompleted: Number,
    projectTitle: String,
    externalParticipation: String,
    awards: String,
    paperPublished: String
});

const Score = mongoose.model('Score', scoreSchema);

app.post('/submit', async (req, res) => {
    const {
        name,
        roll,
        attendance,
        arrears,
        language,
        skillset,
        cgpa,
        communication,
        leadership,
        criticalThinking,
        onlineCourses,
        coursesPlatforms,
        otherPlatform,
        projectCompleted,
        projectTitle,
        externalParticipation,
        awards,
        paperPublished
    } = req.body;

    try {
        const score = new Score({
            name,
            roll,
            attendance,
            arrears,
            language,
            skillset,
            cgpa,
            communication,
            leadership,
            criticalThinking,
            onlineCourses,
            coursesPlatforms,
            otherPlatform,
            projectCompleted,
            projectTitle,
            externalParticipation,
            awards,
            paperPublished
        });
        await score.save();
        res.status(201).json({ message: 'Score saved successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/get', async (req, res) => {
    try {
        const scores = await Score.find();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching scores from the database.' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

