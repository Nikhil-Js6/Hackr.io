import styles from '../../styles/Admin.module.css'
import { API } from '../../config'
import axios from 'axios'
import Link from 'next/link'

const Admin = () => {
    
    return (
        <div className={styles.adminWrapper}>
            <h1 className={styles.adminHeading}>Admin Dashboard:</h1>
            <div className={styles.admin}>
                <div className={styles.adminLeft}>
                    <ul className={styles.adminOptionsList}>
                        <li className={styles.adminOption}>
                            <Link href={'/admin/categories/create'}>
                                Create Category
                            </Link>
                        </li>
                        <li className={styles.adminOption}>
                            <Link href={'/admin/categories/get?category=all'}>
                                Get All Categories
                            </Link>
                        </li>
                        <li className={styles.adminOption}>
                            <Link href={'/admin/categories/create'}>
                                Update Category
                            </Link>
                        </li>
                        <li className={styles.adminOption}>
                            <Link href={'/admin/categories/create'}>
                                Delete Category
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.adminRight}>
                    Categories
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps  = async (context) => {
    const token = context.req.headers.cookie?.split(';').find(cookie => cookie.trim().startsWith(`token=`)).split('=')[1];
    if(!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
}

export default Admin
