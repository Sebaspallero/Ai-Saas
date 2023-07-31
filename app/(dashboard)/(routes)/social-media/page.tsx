"use client"

import { Sparkle } from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { useRouter } from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import { ChatCompletionRequestMessage } from "openai"
import axios from "axios"
import * as z from "zod"

import Heading from "@/components/Heading"
import { Form, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Empty from "@/components/Empty"
import Loader from "@/components/Loader"
import UserAvatar from "@/components/UserAvatar"
import BotAvatar from "@/components/BotAvatar"
import { useProModal } from "@/hooks/UseProModal"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"

const TranslationPage = () => {

    const router = useRouter()
    const[messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
    const proModal = useProModal()

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

            const response = await axios.post("/api/social-media", {
                messages: newMessages
            })

            setMessages((current) => [...current, userMessage, response.data])

            form.reset()
       }
       catch(error: any){
            if(error?.response?.status === 403){
                proModal.onOpen()
            } else{
                toast.error('Something went wrong.')
            }
       }
       finally{
            router.refresh()
       }
    }
    
  return (
    <div>
        <Heading
            title="Social Media Generation"
            description="Generate Social Media posts to increase your interactions."
            Icon={Sparkle}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
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
                                        placeholder="Generate an Instagram post about the importance of adopting dogs"
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
                        <div key={message.content} className={cn("p-4 w-full flex items-center gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                            {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                            <p className="text-sm">{message.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TranslationPage