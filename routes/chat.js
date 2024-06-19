const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const auth = require('../middleware/auth');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/chat', auth, async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 150,
        });
        res.json({ reply: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
