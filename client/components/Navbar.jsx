import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import Router from 'next/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { isAuth, Logout } from '../util/Auth'


// Start and end prgress bar with route change:

Router.onRouteChangeStart = (url) => nprogress.start();
Router.onRouteChangeComplete = (url) => nprogress.done();
Router.onRouteChangeError = (url) => nprogress.done();

const Navbar = () => {
       
    const router = useRouter();
    useEffect(() => {
        !isAuth() && router.push('/login');
    }, [isAuth]);

    const handleLogout = () => {
        Logout();
        router.push('/login');
    }

    return (
        <div className={styles.navbar}>
            <Link href="/" passHref>
            <div className={styles.navbarLeft}>
                Hackr.io_
            </div>
            </Link>
            { isAuth()
                ? (
                    <div className={styles.navbarRight}>
                        <span className={styles.navbarRightItem}>{isAuth().name}</span>
                        <span onClick={handleLogout} className={styles.navbarRightItem}>Logout</span>
                    </div>
                ) : (
                    <div className={styles.navbarRight}>
                        <Link href={'/login'} passHref>
                            <span className={styles.navbarRightItem}>Login</span>
                        </Link>
                        <Link href={'/register'} passHref>
                            <span className={styles.navbarRightItem}>Register</span>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar
