'use client'
import AdminNavbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
export default Layout