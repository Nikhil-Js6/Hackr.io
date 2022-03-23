import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { API } from '../config'
import axios from 'axios'
import Link from 'next/link'
import { Cards } from '../util/dummyData'


const Home = () => {

    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`${API}/categories/get?category=all`);
            setCategories(res.data.categories);
            console.log(categories);
        }
        getCategories();
    }, []);

    return (
        <div className={styles.categoriesWrapper}>
            <h1 className={styles.heading}>Browse Topics:</h1>
            <div className={styles.categories}>
            {   
                Cards.map(card => (
                    <Link href={`/admin/categories/get?topic=${(card.name).toLowerCase().replace(' ', '-')}`}>
                        <div className={styles.card}>
                            <div className={styles.cardTop}>
                                <img 
                                    src={`${card.url}`}
                                    className={styles.img}
                                />
                            </div>
                            <div className={styles.cardBottom}>
                                <span className={styles.categoryName}>{card.name}</span>
                            </div>
                        </div>
                    </Link>
                ))
            }
            </div>
        </div>
    )
}

export default Home
