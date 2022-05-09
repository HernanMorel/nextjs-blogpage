import React from 'react'
import Link from 'next/link';
import Styles from '../styles/Header.module.css'
//using the shortcut rfc will return a template for a react functional component
//link is next js substitute for react router and client-side route transitions

function Header() {
    return (
        <header className={Styles.header}>

            <div className={Styles.btnContainer}>
                <Link href='/'>
                    <a className={Styles.lnk}>
                        <button className={Styles.btn}>
                            {/*this takes the name of the button just like regular html*/}
                            H.M. Blog
                        </button>
                    </a>
                </Link>
            </div>
{/*in Next, the a tag gets the style and the link link tag get the route href*/}
            <Link href='/'>
                <a className={Styles.lnk}>
                    Home
                </a>
            </Link>
            <Link href='/about'>
                <a className={Styles.lnk}>
                    About
                </a>
            </Link>
        </header>
    )
}

export default Header
