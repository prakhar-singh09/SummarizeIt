const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { OpenAI } = require('openai');
require('dotenv').config()
var fetchuser = require("../middlewares/fetchuser");
const axios = require('axios');


const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey, // This is the default and can be omitted
});


router.post('/url-summary', fetchuser, async (req, res) => {
 try {
    const { url } = req.body;
    const response = await axios.get(
      `https://article-extractor-and-summarizer.p.rapidapi.com/summarize`,
      {
        params: { url },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com"
        }
      }
    );

    res.json({ summary: response.data.summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

router.post('/generate-summary',fetchuser, async (req, res) => {
    const { text } = req.body;
    try {
      const response = await openai.chat.completions.create({
        temperature: 0.8,
        max_tokens: 100,
        messages: [{ role: 'user', content: `Generate summary with text: "${text}"` }],
        model: 'gpt-3.5-turbo',
      });
  
      const generatedDescription = response.choices[0].message.content;
      res.json({ description: generatedDescription });
    } catch (error) {
      console.error('Error generating description:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



module.exports = router;