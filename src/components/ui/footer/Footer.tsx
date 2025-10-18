import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {


    return (
        <div className='flex w-full justify-center text-sm mb-10 gap-3  '>
            <Link
                href={'/'}

            >
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                <span>
                    | shop
                </span>
                <span> &copy; {new Date().getFullYear()}</span>
            </Link>
            <Link
                href={'/'}
            > Privacidad & Legal </Link>

            <Link
                href={'/'}
            >  Ubicaciones </Link>

        </div>
    )
}

