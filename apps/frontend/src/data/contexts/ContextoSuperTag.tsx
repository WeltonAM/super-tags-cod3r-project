"use client"

import { SuperTagDTO } from "adapters"
import { createContext, useCallback, useEffect, useState } from "react"
import useApi from "../hooks/useApi"

export interface SuperTagContextProps {
    superTags: SuperTagDTO[]
    currentSuperTag: SuperTagDTO | null
    selecionarSuperTagId: (idSuperTag: string) => Promise<any>
    updateSuperTag: (id: string, updatedData: Partial<SuperTagDTO>) => void
    carregando: boolean
}

const SuperTagContext = createContext<SuperTagContextProps>({} as any)

export function SuperTagProvider({ children }: any) {
    const { httpGet } = useApi()
    const [superTags, setSuperTags] = useState<any[]>([])
    const [currentSuperTag, setCurrentSuperTag] = useState<SuperTagDTO | null>(null)
    const [carregando, setCarregando] = useState<boolean>(false)

    const obterSuperTags = useCallback(async () => {
        setCarregando(true)
        const resposta = await httpGet("/supertags");
        setSuperTags(resposta.json);
        setCarregando(false)
    }, [httpGet])

    useEffect(() => {
        obterSuperTags()
    }, [obterSuperTags])

    const selecionarSuperTagId = useCallback(
        async (idSuperTag: string) => {
            setCarregando(true)
            const resp = await httpGet(`/supertag/${idSuperTag}`)
            setCurrentSuperTag(resp.json)
            setCarregando(false)
            return resp.json
        },
        [httpGet],
    )

    const updateSuperTag = (id: string, updatedData: Partial<SuperTagDTO>) => {
        setSuperTags(
            prevTags => prevTags.map(tag => tag.id.valor === id ? { ...tag, ...updatedData } : tag)
        )

        if (currentSuperTag && currentSuperTag.id === id) {
            setCurrentSuperTag(prevTag => ({ ...prevTag, ...updatedData }))
        }
    }

    return (
        <SuperTagContext.Provider
            value={{
                superTags,
                currentSuperTag,
                carregando,
                selecionarSuperTagId,
                updateSuperTag,
            }}
        >
            {children}
        </SuperTagContext.Provider>
    )
}

export default SuperTagContext
