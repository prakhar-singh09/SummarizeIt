const connectToMongo = require('./db');
const express = require('express');
const { OpenAI } = require('openai');

const cors = require('cors');
require('dotenv').config()

connectToMongo();


const app = express();

app.use(cors());

app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey, // This is the default and can be omitted
  });


app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.post('/generate-summary',async (req, res) => {
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
  
if (process.env.PORT) {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port http://localhost:${process.env.PORT}`);
    });
}
module.exports = app;
