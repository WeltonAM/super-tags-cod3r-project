'use client'
import { useState, useEffect } from 'react';
import useSuperTag from '@/data/hooks/useSuperTag';
import { IconCalendar, IconCalendarMonth, IconCheckbox, IconFileText, IconGripVertical, IconListDetails, IconNumbers, IconPlus } from '@tabler/icons-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useParams } from 'next/navigation';
import MenuPropriedade from '@/components/shared/MenuPropriedade';

interface Propriedade {
    tipo: string;
    descricao: string;
    valor: any;
}

export default function SuperTagPage() {
    const { idSuperTag } = useParams();
    const { selecionarSuperTagId, updateSuperTag } = useSuperTag();

    const [titulo, setTitulo] = useState<string>('');
    const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
    const [isMenuPropriedadeOpen, setIsMenuPropriedadeOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [expanded, setExpanded] = useState<boolean>(true);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>('');
    const [focusedDiv, setFocusedDiv] = useState<number | null>(null);
    const [focusedInput, setFocusedInput] = useState<number | null>(null);

    const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitulo = e.target.value;
        setTitulo(newTitulo);
        updateSuperTag(idSuperTag as string, { titulo: newTitulo });
    };

    const handleEmojiSelect = (emoji: any) => {
        setSelectedEmoji(emoji.native);
        setEmojiPickerVisible(false);
        updateSuperTag(idSuperTag as string, { emoji: emoji.native });
    };

    const toggleMenuPropriedade = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = event;
        setMenuPosition({ x: clientX + 110, y: clientY + 20 });
        setIsMenuPropriedadeOpen(!isMenuPropriedadeOpen);
    };

    const closeMenuPropriedade = () => {
        setIsMenuPropriedadeOpen(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleTipoSelecionado = (tipo: string) => {
        if (focusedDiv !== null) {
            setPropriedades(propriedades.map((prop, i) => {
                if (i === focusedDiv) {
                    return { ...prop, tipo };
                }
                return prop;
            }));
        }
        closeMenuPropriedade();
    };

    const handleDescricao = (descricao: string, index: number) => {
        setPropriedades(propriedades.map((prop, i) => {
            if (i === index) {
                return { ...prop, descricao };
            }
            return prop;
        }));
    };

    const handleDeletarPropriedade = () => {
        setPropriedades(propriedades.filter((prop, i) => i !== focusedDiv));
        closeMenuPropriedade();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && !event.target.closest("#prop-info, #menu-prop, #prop-item")) {
                closeMenuPropriedade();
                setFocusedDiv(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!idSuperTag) return;

        selecionarSuperTagId(idSuperTag as string).then(superTag => {
            setTitulo(superTag.titulo!);
            setSelectedEmoji(superTag.emoji!);
            setPropriedades(superTag.propriedades!.todas!);
        });
    }, [idSuperTag, selecionarSuperTagId]);

    return (
        <div className="flex flex-col py-10 px-6 flex-1">
            <div className='flex items-center'>
                <div className='flex items-center cursor-pointer'>
                    {expanded ? (
                        <svg
                            onClick={() => setExpanded(!expanded)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="gray"
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
                            stroke="gray"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    )}

                    <div className="relative select-none">
                        <span className="text-5xl" onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}>
                            {selectedEmoji}
                        </span>

                        {emojiPickerVisible && (
                            <div className="absolute z-10 mt-2">
                                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                            </div>
                        )}

                        <input
                            type="text"
                            id="SuperTagTitulo"
                            value={titulo}
                            onChange={handleTituloChange}
                            className='text-3xl font-black bg-transparent focus:outline-none'
                        />
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2">
                        <IconListDetails />
                        <span className="font-inter">Propriedades</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-zinc-900 p-6 rounded border-l-4 border-purple-900">
                        {propriedades && propriedades.map((propriedade: any, index: number) => (
                            <div key={index} className="flex w-full items-center" id="prop-info">
                                <IconGripVertical stroke={2} className="text-zinc-700" />

                                <div
                                    id="prop-item"
                                    className={`grid grid-cols-3 gap-2 ${focusedDiv === index ? 'border border-zinc-500' : ''} rounded-md w-full`}
                                    onClick={() => setFocusedDiv(index)}
                                >
                                    <div className={`col-span-1 ${focusedInput === index ? 'bg-black' : ''} p-1 rounded-l-md`}>
                                        <div className="flex items-center gap-4 font-inter">
                                            {
                                                propriedade.tipo === 'checkbox' ? (
                                                    <button
                                                        onClick={(event) => {
                                                            toggleMenuPropriedade(event)
                                                            setFocusedDiv(index)
                                                        }}
                                                        className={`hover:bg-zinc-800 rounded`}
                                                    >
                                                        <IconCheckbox stroke={2} />
                                                    </button>
                                                ) : propriedade.tipo === 'data' ? (
                                                    <button
                                                        onClick={(event) => {
                                                            toggleMenuPropriedade(event)
                                                            setFocusedDiv(index)
                                                        }}
                                                        className={`hover:bg-zinc-800 rounded`}
                                                    >
                                                        <IconCalendar stroke={2} />
                                                    </button>
                                                ) : propriedade.tipo === 'numero_inteiro' ? (
                                                    <button
                                                        onClick={(event) => {
                                                            toggleMenuPropriedade(event)
                                                            setFocusedDiv(index)
                                                        }}
                                                        className={`hover:bg-zinc-800 rounded`}
                                                    >
                                                        <IconNumbers stroke={2} />
                                                    </button>
                                                ) : propriedade.tipo === 'numero_real' ? (
                                                    <button
                                                        onClick={(event) => {
                                                            toggleMenuPropriedade(event)
                                                            setFocusedDiv(index)
                                                        }}
                                                        className={`hover:bg-zinc-800 rounded`}
                                                    >
                                                        <IconNumbers stroke={2} />
                                                    </button>
                                                ) : propriedade.tipo === 'texto' ? (
                                                    <button
                                                        onClick={(event) => {
                                                            toggleMenuPropriedade(event)
                                                            setFocusedDiv(index)
                                                        }}
                                                        className={`hover:bg-zinc-800 rounded`}
                                                    >
                                                        <IconFileText stroke={2} />
                                                    </button>
                                                ) : null
                                            }
                                            <input
                                                onClick={() => {
                                                    setFocusedDiv(index)
                                                    setFocusedInput(index)
                                                }}
                                                onMouseLeave={() => setFocusedInput(null)}
                                                type="text"
                                                value={propriedade.descricao}
                                                onChange={e => handleDescricao(e.target.value, index)}
                                                className="focus:outline-none bg-transparent rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center col-span-2 pl-2">
                                        {
                                            propriedade.tipo === 'checkbox' ? (
                                                <>
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input id="checkbox" type="checkbox" value={propriedade.valor} className="sr-only peer" />
                                                        <div
                                                            className="
                                                            relative w-9 h-5   
                                                            rounded-full peer  
                                                            bg-gray-700 
                                                            peer-checked:after:translate-x-full 
                                                            peer-checked:after:border-purple-800
                                                            peer-checked:after:bg-purple-800
                                                            peer-checked:bg-white
                                                            after:absolute after:top-[2px] after:start-[2px] 
                                                            after:bg-zinc-900
                                                            after:border 
                                                            after:border-zinc-900 
                                                            after:rounded-full after:h-4 after:w-4 
                                                            after:transition-all 
                                                        "></div>
                                                    </label>
                                                </>
                                            ) : propriedade.tipo === 'data' ? (
                                                <>
                                                    <IconCalendarMonth stroke={2} color="gray" className="mr-1" />
                                                    {formatDate(propriedade.valor)}
                                                </>
                                            ) : propriedade.tipo === 'numero_inteiro' ? (
                                                <>
                                                    {propriedade.valor}
                                                </>
                                            ) : propriedade.tipo === 'numero_real' ? (
                                                <>
                                                    {propriedade.valor}
                                                </>
                                            ) : propriedade.tipo === 'texto' ? (
                                                <>
                                                    {propriedade.valor}
                                                </>
                                            ) : (
                                                <>
                                                    {propriedade.valor}
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="flex items-center gap-1 font-inter p-2 hover:bg-zinc-800 w-fit rounded-md">
                            <IconPlus stroke={1.5} />
                            Adicionar propriedade
                        </button>
                    </div>
                </div >
            )}

            {
                isMenuPropriedadeOpen && (
                    <div className="absolute z-50" id="menu-prop" style={{ top: menuPosition.y, left: menuPosition.x }}>
                        <MenuPropriedade onTipoSelecionado={handleTipoSelecionado} handleDeletarPropriedade={handleDeletarPropriedade} />
                    </div>
                )
            }
        </div >
    );
}
