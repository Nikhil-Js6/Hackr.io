import styles from '../../../styles/Home.module.css'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { API } from '../../../config'
import axios from 'axios'


const Get = () => {

    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const query = router.query.topic;

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`${API}/categories/get?category=${query}`);
            setCategories(res.data.categories);
        }
        getCategories();
    }, [query]);

    return (
        <div className={styles.categoriesWrapper}>
            <ul>{
                categories.length === 0 && <h1>{`No Data for ${query?.replace('-', ' ')}`}</h1>
                }
                {categories.map(c => (
                    <span style={{width:'100%', display: 'flex', justifyContent: "spaceBetween"}}>
                        <h3>{c.name}: </h3>
                        <p>{c.content}</p>
                        <img src={c?.image?.url} />
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default Get
