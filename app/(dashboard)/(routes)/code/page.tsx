"use client"

import { Code} from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { useRouter } from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import { ChatCompletionRequestMessage } from "openai"
import { useState } from "react"
import Heading from "@/components/Heading"
import ReactMarkdown from 'react-markdown'
import axios from "axios"
import * as z from "zod"

import { Form, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Empty from "@/components/Empty"
import Loader from "@/components/Loader"
import UserAvatar from "@/components/UserAvatar"
import BotAvatar from "@/components/BotAvatar"
import { cn } from "@/lib/utils"

const CodePage = () => {

    const router = useRouter()
    const[messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: ""
        }
    })

    const loading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try{
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]

            const response = await axios.post("/api/code", {
                messages: newMessages
            })

            setMessages((current) => [...current, userMessage, response.data])

            form.reset()
       }
       catch(error: any){
            console.log(error)
            //OPEN PRO MODAL
       }
       finally{
            router.refresh()
       }
    }
    
  return (
    <div>
        <Heading
            title="Code Generation"
            description="Our most advanced conversation model."
            Icon={Code}
            iconColor="text-green-700"
            bgColor="bg-green-700/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4  px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                        <FormField name="prompt" render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormItem className="m-0 p-0">
                                    <Input 
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={loading}
                                        placeholder="Simple toggle button using React hooks."
                                        {...field}/>
                                </FormItem>
                            </FormItem>
                        )}/>
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={loading}>Generate</Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {loading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader/>
                    </div>
                )}
                {messages.length === 0 && !loading && (
                    <Empty label="No conversation started"/>
                )}
                <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message) => (
                        <div key={message.content} className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                            {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                            <ReactMarkdown 
                                className=" text-sm overflow-hidden leading-7"
                                components={{
                                    pre: ({node, ...props}) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props}/>
                                        </div>
                                    ),
                                    code: ({node, ...props}) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props}/>
                                    )
                                }}
                            >
                                {message.content || ''}
                            </ReactMarkdown>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CodePage