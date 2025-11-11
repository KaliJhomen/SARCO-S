'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { Package, MapPin, Calendar, CreditCard, Eye, Truck } from 'lucide-react';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">      
      <main>

        
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1920px] mx-auto">
        </section>

      </main>
    </div>
  );
};


export default AdminPage;