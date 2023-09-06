"use client"

import { useProModal } from "@/hooks/UseProModal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import {
    MessageSquare,
    ImageIcon,
    VideoIcon,
    Music,
    Code,
    Check,
    Zap,
    Sparkles,
  } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

const tools = [
    {
      label: 'Conversation',
      icon: MessageSquare,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: 'text-pink-700',
      bgColor: 'bg-pink-700/10',
    },
    {
      label: 'Code Generation',
      icon: Code,
      color: 'text-green-700',
      bgColor: 'bg-green-700/10',
    }
  ]

const ProModal = () => {

    const proModal = useProModal()
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-4">
                    <div className="flex items-end gap-x-2 font-bold py-1">
                        Thanks for testing
                        <div className="relative mr-2">
                          <Image
                            height={70}
                            width={120}
                            alt="logo"
                            src='/name-logo-dk.svg'/>
                        </div>
                    <Badge className="text-xs py-1 text-accent-foreground mb-4 -ml-2" variant='outline'>
                        Beta
                    </Badge>  
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5"/>
                        </Card>
                    ))}
                </DialogDescription>
                <div className="flex items-center justify-center gap-1 py-2">
                  <Sparkles className="fill-yellow-400 text-yellow-400"/> <p className="text-center text-lg font-bold">More features coming soon</p> <Sparkles className="fill-yellow-400 text-yellow-400"/>
                </div>
                  <p className="text-left text-sm">This was a beta version of an upcoming project made with OpenAI, Next.js, Prisma and Tailwind.</p>
                  <p className="text-left text-sm">If you want to collaborate in this project you can write an email to <span className="bg-gray-300 py-[2px] px-[6px] rounded-md">sebastianpallerodev@gmail.com</span> (we are looking for someone to integrate payment suscriptions), or you can donate to the project with the link below.</p>
            </DialogHeader>
            <DialogFooter>
              <a href="https://cafecito.app/sebastianpallero" target="_blank" rel="noreferrer" className="w-full">
                <Button variant='premium' size='lg' className="w-full">
                      Donate
                      <Zap className="w-4 h-4 fill-white ml-2"/>
                </Button>
              </a>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ProModal