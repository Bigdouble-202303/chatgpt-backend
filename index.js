const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const openai = require('openai');

const OPENAI_API_KEY = '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';
const OPENAI_ENGINE = 'davinci';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/gpt', async (req, res) => {
	  const { message } = req.body;

	  const prompt = `User: ${message}\nAI:`;

	  try {
		      const gptResponse = await openai.complete({
			            engine: OPENAI_ENGINE,
			            prompt,
			            maxTokens: 100,
			            n: 1,
			            stop: '\n',
			          }, {
					        headers: {
							        'Authorization': `Bearer ${OPENAI_API_KEY}`,
							        'Content-Type': 'application/json'
							      },
					      });

		      const { choices } = gptResponse.data;
		      const { text } = choices[0];

		      res.send(text);
		    } catch (err) {
			        console.error(err);
			        res.status(500).send('Something went wrong');
			      }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	  console.log(`Server running on port ${PORT}`);
});

