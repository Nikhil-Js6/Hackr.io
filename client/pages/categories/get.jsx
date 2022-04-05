import styles from '../../styles/Home.module.css'
import { API } from '../../config'
import axios from 'axios'


const Get = (props) => {

    return (
        <div className={styles.categoriesWrapper}>
            <ul>{JSON.stringify(props)}</ul>
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {

    let limit = 1;
    let skip = 0;

    const res = await axios.get(`${API}/categories/get?category=${query.topic}`, { limit, skip });

    return {
        props: {
            query,
            category: res.data.categories,
            links: res.data.links,
            totalLinks: res.data.links.length,
            limit,
            skip
        }
    }
}

export default Get
