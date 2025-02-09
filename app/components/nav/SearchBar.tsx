"use client"

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push("/");

        const url = queryString.stringifyUrl(
            {
                url: "/",
                query: { searchTerm: data.searchTerm }
            },
            { skipNull: true }
        );

        router.push(url);
        reset();
        setIsOpen(false);
    };

    // Закрытие поля при клике вне
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={searchRef}>
            {/* Иконка поиска (для мобильных) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-gray-600 hover:text-black focus:outline-none md:hidden"
                >
                    <FaSearch size={20} />
                </button>
            )}

            {/* Поле ввода поиска (открывается при isOpen) */}
            {isOpen && (
                <div className="fixed inset-0 bg-white flex items-center px-4 py-2 z-50">
                    <input
                        {...register("searchTerm")}
                        autoComplete="off"
                        type="text"
                        placeholder="Поиск..."
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-slate-500"
                        autoFocus
                    />
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className="ml-2 bg-slate-700 hover:opacity-80 text-white p-3 rounded-md"
                    >
                        🔍
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="ml-2 text-gray-600 hover:text-black text-lg"
                    >
                        ✖
                    </button>
                </div>
            )}

            {/* Десктопная версия */}
            <div className="hidden md:flex items-center gap-2">
                <input
                    {...register("searchTerm")}
                    autoComplete="off"
                    type="text"
                    placeholder="Поиск..."
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-slate-500 w-64"
                />
                <button
                    onClick={handleSubmit(onSubmit)}
                    className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-md"
                >
                    🔍
                </button>
            </div>
        </div>
    );
};

export default SearchBar;