    import React, { useState, useEffect, useRef } from 'react';
    import Link from 'next/link';
    import {
    ShoppingCart,
    User,
    Menu,
    X,
    LogOut,
    Package,
    Palette,
    Settings,
    } from 'lucide-react';

    const Tooltip = ({ children, text }: any) => (
    <div className="group relative">
        {children}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        {text}
        </div>
    </div>
    );

    const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const cartItemsCount = 3;

    // Fecha o menu de perfil quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: any) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setIsProfileOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    return (
        <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <div className="flex items-center">
                <div className="h-8 w-32 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-white font-bold">LOGO</span>
                </div>
                </div>
            </Link>

            {/* Menu Principal
            <div className="hidden md:flex items-center space-x-8">
                <Link href="/customize" className="text-gray-600 hover:text-blue-600 font-medium">
                Personalizar
                </Link>
                <Link href="/templates" className="text-gray-600 hover:text-blue-600 font-medium">
                Templates
                </Link>
                <Link href="/uniforms" className="text-gray-600 hover:text-blue-600 font-medium">
                Uniformes
                </Link>
                <Link href="/collections" className="text-gray-600 hover:text-blue-600 font-medium">
                Coleções
                </Link>
            </div> */}

            {/* Ícones de Ação */}
            <div className="hidden md:flex items-center space-x-8">
                <Tooltip text="Editor">
                <Link href="/playground" className="text-gray-600 hover:text-gray-900">
                    <Palette className="h-6 w-6" />
                </Link>
                </Tooltip>

                <Tooltip text="Carrinho">
                <Link href="/cart" className="relative text-gray-600 hover:text-gray-900">
                    <ShoppingCart className="h-6 w-6" />
                    {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                        {cartItemsCount}
                    </span>
                    )}
                </Link>
                </Tooltip>

                {/* Perfil com Dropdown */}
                <div className="relative" ref={profileRef}>
                <Tooltip text="Minha Conta">
                    <button
                    onClick={toggleProfile}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                    <User className="h-6 w-6" />
                    </button>
                </Tooltip>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                    <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="h-4 w-4 mr-2" />
                        Meu Perfil
                    </Link>
                    <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Package className="h-4 w-4 mr-2" />
                        Meus Pedidos
                    </Link>
                    <Link href="/designs" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Palette className="h-4 w-4 mr-2" />
                        Meus Designs
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                    </Link>
                    <hr className="my-1" />
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                    </button>
                    </div>
                )}
                </div>
            </div>

            {/* Menu Mobile */}
            <div className="md:hidden">
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
            </div>
        </nav>

        {/* Menu Mobile Expandido */}
        {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col">
                <Link href="/customize" className="px-4 py-3 text-gray-600 hover:bg-gray-50">
                Personalizar
                </Link>
                <Link href="/templates" className="px-4 py-3 text-gray-600 hover:bg-gray-50">
                Templates
                </Link>
                <Link href="/uniforms" className="px-4 py-3 text-gray-600 hover:bg-gray-50">
                Uniformes
                </Link>
                <Link href="/collections" className="px-4 py-3 text-gray-600 hover:bg-gray-50">
                Coleções
                </Link>
                <Link href="/playground" className="px-4 py-3 text-gray-600 hover:bg-gray-50">
                Editor
                </Link>
            </nav>
            </div>
        )}
        </header>
    );
    };

    export default Header;