import styles from '../../../styles/Submit.module.css'
import { useState, useEffect } from 'react'
import { API } from '../../../config'
import { Alert } from '../../../util/Alerts'
import {Cards as dummyData} from '../../../util/dummyData'
import axios from 'axios'

const create = ({ token }) => {
    
    const [state, setState] = useState({
        title: '',
        url: '',
        categories: [],
        categoryOptions: [],
        type: '',
        medium: '',
        message: '',
        messageType: Number,
    });

    const [notification, setNotification] = useState('');

    useEffect(async() => {
        const res = await axios.get(`${API}/categories/get?category=all`);
        setState({ ...state, categoryOptions: res.data });
    }, [state.message]);

    const handleCategory = name => {

        const newCateg = name.toLowerCase().replace(' ', '-');
        let categoryArray = state.categories;

        if (categoryArray.includes(newCateg)) {
            setNotification(`Removed ${name}`);
            categoryArray = state.categories.filter(cat => {
                return cat !== newCateg;
            });
        }
        else {
            setNotification(`Added ${name}`);
            categoryArray.push(newCateg);
        }
        setState({ ...state, categories: categoryArray, message: null });
        setTimeout(() => {
            setNotification('');
        }, 1200);
    }

    const { title, url, categories, type, medium } = state;
    const formData = { title, url, categories, type, medium }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/link/create`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setState({  
                title: '',
                url: '',
                categories: [],
                type: '',
                medium: '',
                message: res.data.message, messageType: 1
            });
        } 
        catch (err) {
            console.log(err);
            setState({ ...state, message: err.response?.data.message, messageType: 2})
        }
    }

    return (
        <div className={styles.submitWrapper}>
            <h1 className={styles.submitHeading}>Submit a Link/URL</h1>
            <div className={styles.submit}>
                <div className={styles.submitOptions}>
                    <label className={styles.label}>Category</label>
                    <span className={styles.categories}>
                    {
                        dummyData.map((data) => (
                            <span>
                                <input 
                                    id={data.name} 
                                    type={'checkbox'}
                                    onChange={() => handleCategory(data.name)}
                                />
                                <label htmlFor={data.name} className={styles.option}>{data.name}</label>
                            </span>
                        ))
                    }
                    </span>
                    <span>
                        <label className={styles.label}>Type</label>
                        <span className={styles.submitOption}>
                            <span>
                                <input 
                                    id='free' 
                                    name='type' 
                                    type={'radio'} 
                                    value={'free'}
                                    onChange={({ target: { value }}) => setState({ ...state, type: value, message: null })}
                                />
                                <label htmlFor='free' className={styles.option}>Free</label>
                            </span>
                            <span>
                                <input 
                                    id='paid' 
                                    name='type' 
                                    type={'radio'} 
                                    value={'paid'}
                                    onChange={({ target: { value }}) => setState({ ...state, type: value, message: null })}
                                />
                                <label htmlFor='paid' className={styles.option}>Paid</label>
                            </span>
                        </span>
                    </span>
                    <span>
                        <label className={styles.label}>Medium</label>
                        <span className={styles.submitOption}>
                            <span>
                                <input 
                                    id='video' 
                                    name='medium' 
                                    type={'radio'} 
                                    value={'video'}
                                    onChange={({ target: { value }}) => setState({ ...state, medium: value, message: null })}
                                />
                                <label htmlFor='video' className={styles.option}>Video</label>
                            </span>
                            <span>
                                <input 
                                    id='article' 
                                    name='medium' 
                                    type={'radio'} 
                                    value={'article'}
                                    onChange={({ target: { value }}) => setState({ ...state, medium: value, message: null })}
                                />
                                <label htmlFor='article' className={styles.option}>Article</label>
                            </span>
                            <span>
                                <input 
                                    id='book' 
                                    name='medium' 
                                    type={'radio'} 
                                    value={'book'}
                                    onChange={({ target: { value }}) => setState({ ...state, medium: value, message: null })}
                                />
                                <label htmlFor='book' className={styles.option}>Book</label>
                            </span>
                        </span>
                    </span>
                </div>
                <div className={styles.formTab}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {state.message && Alert(state.message, state.messageType)}
                        {
                            notification && 
                                <span className={styles.notify}>
                                    {notification}
                                </span>
                        }
                        <label className={styles.label}>Title</label>
                        <input
                            type={'text'}
                            value={state.title}
                            placeholder='write a title...'
                            required
                            className={styles.input}
                            onChange={({ target: { value }}) => setState({ ...state, title: value, message: null })}
                        />
                        <label className={styles.label}>URL</label>
                        <input 
                            type={'url'}
                            value={state.url}
                            placeholder='https://demo-url.com/'
                            required
                            className={styles.input}
                            onChange={({ target: { value }}) => setState({ ...state, url: value, message: null })}
                        />
                        <button 
                            type='submit' 
                            className={`${styles.button} ${token ? styles.submitButton : styles.loginButton}`}
                            disabled={!token ? true : false}
                        >
                            {token ? 'Submit' : 'Login to Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps  = async (context) => {
    const token = context.req.headers.cookie?.split(';').find(cookie => cookie.trim().startsWith(`token=`)).split('=')[1];
    if(!token) {
        return {
            props: {
                token: null
            }
        }
    }
    return {
        props: { token }
    }
}

export default create
