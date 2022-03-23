import dynmic from 'next/dynamic'
import styles from '../../../styles/Create.module.css'
import { useState } from 'react'
import { API } from '../../../config'
import { Alert } from '../../../util/Alerts'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import 'react-quill/dist/quill.bubble.css';

const Create = ({ token }) => {

    const [state, setState] = useState({
        name: '',
        content: '',
        image: '',
        imageText: 'Upload an image',
        buttonText: 'Create',
        message: '',
        messageType: Number,
    });

    const handleContent = e => {
        setState({ ...state, content: e.target.value, buttonText: 'Create', message: null });
    }

    const handleImage = e => {
        const image = e.target.files[0];
        if (image) {
            Resizer.imageFileResizer(
                image, 480, 480, "JPG", 100, 0,
                (uri) => {
                    setState({ ...state, image: uri, imageText: image.name});
                },
                "base64"
            );
        }
    }

    const { name, image, content } = state;
    const formData = { name, image, content }

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Creating...' });
        try {
            const res = await axios.post(`${API}/category/create`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setState({ 
                ...state, 
                buttonText: 'Created', 
                imageText: 'Upload an Image',
                name: '',
                content : '',
                message: res.data.message, 
                messageType: 1 
            });
        }
        catch (err) {
            console.log(err);
            setState({ ...state, buttonText: 'Create', message: err.response?.data.message, messageType: 2 });
        }
    }

    return (
        <div className={styles.createWrapper}>
            <h1 className={styles.createHeading}>Create Category</h1>
            <div className={styles.create}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {state.message && Alert(state.message, state.messageType)}
                    <label className={styles.label}>Name</label>
                    <input
                        value={state.name}
                        placeholder='Name'
                        required
                        className={styles.input}
                        onChange={({ target }) => setState({ ...state, name: target.value, buttonText: 'Create', message: null })}
                    />
                    <label className={styles.label}>Content</label>
                    <textarea 
                        value={state.content}
                        onChange={handleContent}
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder='Write Something...'
                        theme='bubble'
                    />
                    <span className={styles.upload}>
                        <label className={styles.label} htmlFor='categoryImage'>{state.imageText}</label>
                        <input
                            id='categoryImage'
                            type={'file'}
                            accept='image/*'
                            className={styles.input}
                            onChange={handleImage}
                        />
                        <button type='submit' className={styles.button}>
                            {state.buttonText}
                        </button>
                    </span>
                </form>
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
    return {
        props: { token }
    }
}

export default Create
