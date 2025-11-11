"use client"
import React, { useState } from "react";
import { assets} from "@/assets/assets";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { isSeller} = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 overflow-hidden shadow-lg">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-0 right-10 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

      <div className="relative flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
        {/* Logo */}
        <Image
          className="cursor-pointer w-28 md:w-52 hover:scale-105 transition-transform duration-300"
          onClick={() => router?.push("/")}
          src={assets.logo}
          alt="logo"
          width={208}
          height={56}
          priority
        />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/all-products" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Productos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/offers" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Ofertas
            <span className="absolute -top-1 -right-3 bg-gradient-to-r from-yellow-300 to-orange-400 text-red-900 text-xs px-1.5 py-0.5 rounded-full font-black shadow-lg animate-pulse">
              🔥
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/category" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Electrodomésticos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/furniture" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Mueblería
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/mobility" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Movilidad
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm">
            <Image className="w-5 h-5 brightness-0 invert" src={assets.search_icon} alt="search icon" width={20} height={20} />
          </button>
          <Link href="/favorites" className="text-white hover:text-red-100 transition-colors duration-300 font-bold relative group">
            Favoritos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/20 rounded-full transition-all duration-300 font-medium text-white backdrop-blur-sm">
            <Image className="w-5 h-5 brightness-0 invert" src={assets.user_icon} alt="user icon" width={20} height={20} />
            <span className="hidden lg:inline font-bold">Cuenta</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 border-t border-white/20' : 'max-h-0'}`}>
        <div className="relative px-6 py-4 space-y-3 bg-gradient-to-br from-red-800 via-red-900 to-red-950 backdrop-blur-sm">
          {/* Patrón de fondo en menú móvil */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="relative z-10 space-y-3">
            <Link href="/" className="block text-white hover:text-red-100 hover:bg-white/10 transition-all duration-300 font-medium py-2 px-3 rounded-lg">
              Inicio
            </Link>
            <Link href="/all-products" className="block text-white hover:text-red-100 hover:bg-white/10 transition-all duration-300 font-bold py-2 px-3 rounded-lg">
              Productos
            </Link>
            <Link href="/offers" className="block text-white hover:text-red-100 hover:bg-white/10 transition-all duration-300 font-bold py-2 px-3 rounded-lg relative">
              <div className="flex items-center justify-between">
                <span>Ofertas</span>
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 text-red-900 text-xs px-2 py-0.5 rounded-full font-black">
                  🔥 HOT
                </span>
              </div>
            </Link>
            <Link href="/category" className="block text-white hover:text-red-100 hover:bg-white/10 transition-all duration-300 font-bold py-2 px-3 rounded-lg">
              Electrodomésticos
            </Link>
            <Link href="/furniture" className="block text-white hover:text-red-100 hover:bg-white/10 transition-all duration-300 font-bold py-2 px-3 rounded-lg">
              Mueblería
            </Link>
            <Link href="/mobility" className="block text-white hover:text-red-100 hover:bg-white/10 transition-all duration-300 font-bold py-2 px-3 rounded-lg">
              Movilidad
            </Link>
            
            <div className="pt-3 border-t border-white/20 space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-300 font-bold text-white backdrop-blur-sm">
                <Image className="w-5 h-5 brightness-0 invert" src={assets.user_icon} alt="user icon" width={20} height={20} />
                Mi Cuenta
              </button>
              
              {isSeller && (
                <button 
                  onClick={() => router.push('/seller')} 
                  className="w-full text-sm border-2 border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-red-700 transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  Dashboard Vendedor
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;