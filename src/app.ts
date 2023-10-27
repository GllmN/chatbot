import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import * as path from 'path';

// Config dotenv
dotenv.config({ path: path.join(__dirname, '..', 'config', '.env') });

//Setting up the connection
if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    async function fetchOpenAIResponse() {
        const stream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Say this is a test' },
                { role: 'user', content: 'Say this is a test' }
            ],
            stream : true,
        });
        for await (const part of stream) {
            process.stdout.write(part.choices[0]?.delta?.content || '');
        }
    }

    //Using OpenAIAPI
    fetchOpenAIResponse();
} else {
console.error("API Key is missing");
}