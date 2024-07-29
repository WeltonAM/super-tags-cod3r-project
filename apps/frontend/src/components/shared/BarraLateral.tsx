'use client'

import Link from 'next/link';
import { IconPlus, IconSettings, IconUser } from '@tabler/icons-react';
import useSuperTag from '@/data/hooks/useSuperTag';
import { SuperTagDTO } from 'adapters';
import { useState } from 'react';

interface BarraLateralProps {
    isOpen: boolean;
}

export default function BarraLateral({ isOpen }: BarraLateralProps) {
    const { superTags } = useSuperTag();
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className={`
            flex flex-col justify-between
            top-0 left-0 grow-1 
            text-white transform 
            border-r-2 border-zinc-800
            ${isOpen ? 'w-64' : 'w-0'} 
            transition-width overflow-hidden z-50
            select-none
        `}>
            <div>
                <Link href="/usuario" className="text-white block px-4 py-3 text-sm hover:bg-gray-800" role="menuitem">
                    <IconUser size={20} className="inline-block mr-2" />
                    Meu Perfil
                </Link>
                <Link href="/configuracoes" className="text-white block px-4 py-3 text-sm hover:bg-gray-800" role="menuitem">
                    <IconSettings size={20} className="inline-block mr-2" />
                    Configurações
                </Link>
            </div>

            <div className="p-5 flex flex-col flex-1 font-inter">
                <p className="py-1 text-xs uppercase mb-2">SuperTags</p>

                <ul>
                    {
                        superTags && superTags.map((superTag: any) => (
                            superTag.id && superTag.id.valor && (
                                < li key={superTag.id.valor} className="mb-2" >
                                    <div className="flex flex-col cursor-pointer">
                                        <div className='flex items-center'>
                                            {expanded ? (
                                                <svg
                                                    onClick={() => setExpanded(!expanded)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    onClick={() => setExpanded(!expanded)}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            )}

                                            <Link href={`/inicio/${superTag.id.valor}`} >{superTag.emoji} <span className='text-xs'>{superTag.titulo}</span></Link>
                                        </div>

                                        <ul className="list-disc list-inside">
                                            {superTag.filhas && superTag.filhas.todas.map((filha: any) => (
                                                <li key={filha.id} className="ml-4 mb-2">
                                                    <strong>{filha.emoji}</strong> {filha.titulo}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </ li>
                            )
                        ))
                    }
                </ul>
            </div>

            <div className="pb-6 flex justify-center items-center">
                <Link href='/' className="flex justify-center items-center text-white border-2 border-zinc-800 p-2 rounded w-5/6">
                    <IconPlus size={20} />
                    <span className='text-xs ml-2'>Nova SuperTag</span>
                </Link>
            </div>
        </div>
    );
}
