import styles from '../../../styles/Activate.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from '../../../config';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const Activate = () => {

    const router = useRouter();
    const [state, setState] = useState({
        name: '',
        token: '',
        heading: '',
        buttonText: 'Activate Now!',
        success: false,
        message: null,
        messageType: Number,
    });

    useEffect(() => {
        let { token } = router.query;
        if(token){
            const { name } = jwt.decode(token);
            setState({ ...state, name, heading: `Hey ${name}, Activate your account and get started now.`, token });
        }
    }, [router]);

    const handleActivate = async () => {
        setState({...state, buttonText: 'Processing...'});
        const { token } = state;
        try {
            const res = await axios.post(`${API}/account/activate`, { token });
            setState({ buttonText: 'Login Now!', message: res.data.message, messageType: 1, heading: res.data.message, success: 1 });
        }catch(err) {
            setState({ buttonText: 'Create new Account!', message: err.response.data.message, messageType: 2, heading: err.response.data.message, success: 0 });
        }
    }

    return (
        <div className={styles.activateWrapper}>
            <div className={styles.activate}>
                <h1 className={styles.heading}>{state.heading}</h1>
                <a onClick={handleActivate} className={styles.activateButton} href={state.success === 1 ? '/login' : state.success === 0 && '/register'}>{state.buttonText}</a>
            </div>
        </div>
    )
}

export default Activate
