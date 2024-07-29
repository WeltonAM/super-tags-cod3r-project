'use client'

import { useEffect, useRef, useState } from "react";
import { IconTrash, IconCheckbox, IconCalendar, IconNumbers, IconFileText, IconListDetails } from "@tabler/icons-react";

interface MenuPropriedadeProps {
    onTipoSelecionado: (tipo: string) => void;
    handleDeletarPropriedade: () => void;
}

export default function MenuPropriedade({ onTipoSelecionado, handleDeletarPropriedade }: MenuPropriedadeProps) {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setShowSubMenu(true);
    };

    const handleMouseLeave = () => {
        setShowSubMenu(false);
    };

    const handleTipoSelecionado = (tipo: string) => {
        onTipoSelecionado(tipo);
    };

    return (
        <div ref={menuRef} className="text-left">
            <div className="absolute right-0 w-48 rounded-md shadow-xl bg-zinc-950 border border-zinc-500">
                <div className="py-1 cursor-pointer" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div
                        className="block p-2 text-sm font-semibold text-white relative"
                        role="menuitem"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="flex items-center gap-2">
                            <IconListDetails />
                            Selecionar Tipo
                        </span>
                        {showSubMenu && (
                            <div className="absolute left-[94%] top-0 w-48 rounded-md shadow-xl bg-zinc-950 border border-zinc-500 ml-2">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <div
                                        className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
                                        role="menuitem"
                                        onClick={() => handleTipoSelecionado('checkbox')}
                                    >
                                        <IconCheckbox className="inline-block mr-2" /> Checkbox
                                    </div>
                                    <div
                                        className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
                                        role="menuitem"
                                        onClick={() => handleTipoSelecionado('data')}
                                    >
                                        <IconCalendar className="inline-block mr-2" /> Data
                                    </div>
                                    <div
                                        className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
                                        role="menuitem"
                                        onClick={() => handleTipoSelecionado('numero_inteiro')}
                                    >
                                        <IconNumbers className="inline-block mr-2" /> Número Inteiro
                                    </div>
                                    <div
                                        className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
                                        role="menuitem"
                                        onClick={() => handleTipoSelecionado('numero_real')}
                                    >
                                        <IconNumbers className="inline-block mr-2" /> Número Real
                                    </div>
                                    <div
                                        className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
                                        role="menuitem"
                                        onClick={() => handleTipoSelecionado('texto')}
                                    >
                                        <IconFileText className="inline-block mr-2" /> Texto
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-zinc-600"></div>

                    <button
                        className="text-red-600 font-thin block p-2 text-sm w-full text-left hover:bg-gray-800 cursor-pointer"
                        role="menuitem"
                        onClick={handleDeletarPropriedade}
                    >
                        <IconTrash size={20} className="inline-block mr-2" />
                        Remover
                    </button>
                </div>
            </div>
        </div>
    );
}
