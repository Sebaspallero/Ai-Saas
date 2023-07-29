"use client"

import { useEffect } from "react"
import {Crisp} from 'crisp-sdk-web'

export const CrispChat = () => {

    useEffect(()=>{
        Crisp.configure('ccb92035-359d-49cb-99c1-b4e53ef26106')
    },[])

  return null
}
