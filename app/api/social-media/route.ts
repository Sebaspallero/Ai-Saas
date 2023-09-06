import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai'

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: 'You are a creator of social media posts, the user will give you the social media name, like twitter, instagram, linkedind, etc, and a prompt, like a funny tweet about politics, and instagram post about adopting  dogs, etc, and you will create a post for that social media with that prompt. Example: I want an Instagram post about how important is to eat healthy, and you will answer creating something original, with a aprochable lenguage, using SEO and haghstags if neccesary'
}

export async function POST(req: Request) {
    try{
        const {userId} = auth()
        const body = await req.json()
        const {messages} = body

        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }

        if(!configuration.apiKey){
            return new NextResponse('OpenAi API key not configures', {status: 500})
        }

        if(!messages){
            return new NextResponse('Messages are required', {status: 400})
        }

        const freeTrial = await checkApiLimit();

        if(!freeTrial){
            return new NextResponse('Free trial has expired.', { status: 403})
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
            temperature: 0.7,
            max_tokens: 700,
        })

        await increaseApiLimit()

        return NextResponse.json(response.data.choices[0].message)
    }
    catch(error){
        console.log("[CONVERSATION_ERROR]", error)
        return new NextResponse('Internal Error', {status: 500})
    }
}