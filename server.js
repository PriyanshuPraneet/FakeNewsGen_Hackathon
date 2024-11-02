const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateFunnyNews() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Generate 3 funny news that is obviously fake. each news must not be more than two line";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

app.use(express.static(path.join(__dirname)));

app.get('/api/generate-fake-news', async (req, res) => {
    try {
        const fakeNews = await generateFunnyNews();
        res.json({ fakeNews });
    } catch (error) {
        console.error('Error generating fake news:', error);
        res.status(500).json({ error: 'Failed to generate fake news' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
