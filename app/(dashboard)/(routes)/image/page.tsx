"use client"

import { Download, ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { useRouter } from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import axios from "axios"
import * as z from "zod"

import Heading from "@/components/Heading"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Empty from "@/components/Empty"
import Image from "next/image"
import Loader from "@/components/Loader"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card"


const ImagePage = () => {

    const router = useRouter()
    const [images, setImages] = useState<string[]>([])
    const [prompt, setPrompt] = useState<null | string>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })

    const loading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try{
            setImages([])
            setPrompt(null)
            const response = await axios.post("/api/image", values)
            const urls = response.data.map((image: {url: string}) => image.url)
            setImages(urls)
            setPrompt(values.prompt)
            console.log(values)
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
            title="Image Generation"
            description="Turn your prompt into an image."
            Icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4  px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                        <FormField name="prompt" render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                                <FormItem className="m-0 p-0">
                                    <Input 
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={loading}
                                        placeholder="A picture of a bowl of fruit."
                                        {...field}/>
                                </FormItem>
                            </FormItem>
                        )}/>
                        <FormField name="amount" control={form.control} render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {amountOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                        <FormField name="resolution" control={form.control} render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {resolutionOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={loading}>Generate</Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {loading && (
                    <div className="p-20">
                        <Loader/>
                    </div>
                )}
                {images.length === 0 && !loading && (
                    <Empty label="No images generated"/>
                )}
            {/* <div>{prompt}</div> */}
            <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {images.map((src) => (
                    <Card key={src} className="rounded-lg overflow-hidden" >
                        <div className="relative aspect-square">
                            <Image
                                alt="AI generated image"
                                fill
                                src={src}/>
                        </div>
                        <CardFooter className="p-2">
                            <Button variant='secondary' className="w-full" onClick={() => window.open(src)}>
                                <Download className="h-4 w-4 mr-2"/>
                                Download
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default ImagePage