import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import Router from 'next/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';


// Start and end prgress bar with route change:

Router.onRouteChangeStart = (url) => nprogress.start();
Router.onRouteChangeComplete = (url) => nprogress.done();
Router.onRouteChangeError = (url) => nprogress.done();

const Navbar = () => {
    
    let logo = [
        'Hackr.io_','H', 'Ha', 'Hac', 'Hack', 'Hackr', 'Hackr.', 'Hackr.i', 'Hackr.io', 'Hackr.io_',
    ];

    let [logoNum, setLogoNum] = useState(0);

    // setInterval(
    //     () => {
    //         logoNum < logo.length
    //             ? setLogoNum(logoNum+1)
    //             : setLogoNum(logoNum-1);
    //     }
    // , 700);

    return (
        <div className={styles.navbar}>
            <Link href="/" passHref>
            <div className={styles.navbarLeft}>
                {logo[logoNum]}
            </div>
            </Link>
            <div className={styles.navbarRight}>
                <Link href={'/login'} passHref>
                    <span className={styles.navbarRightItem}>Login</span>
                </Link>
                <Link href={'/register'} passHref>
                    <span className={styles.navbarRightItem}>Register</span>
                </Link>
            </div>
        </div>
    )
}

export default Navbar