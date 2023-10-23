import OpenAI from 'openai'
import * as dotenv from 'dotenv'
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, 'config', '.env.example') });
console.log(process.env.OPENAI_API_KEY)
//Setting up the connection
const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"]
    //apiKey : "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"
})

async function test() {
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
test();
//console.log("Hello world")