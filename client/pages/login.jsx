import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'
import { API } from '../config'
import axios from 'axios'
import { Alert } from '../util/Alerts'
import { Authenticate, isAuth } from '../util/Auth'


const Login = () => {
    
    const router = useRouter();
    
    useEffect(() => {
        isAuth() && router.push('/');
    }, [isAuth]);

    const [state, setState] = useState({
        email: '',
        password: '',
        buttonText: 'Login',
        message: null,
        messageType: Number,
    });

    const { email, password } = state;

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Processing...' });
        try {
            const res = await axios.post(`${API}/login`, { email, password });
            setState({ ...state, message: res.data.message, messageType: 1 });
            Authenticate(
                res, () => isAuth()?.role === 'user' ? router.push('/user') : router.push('/admin')
            );
        }
        catch (err) {
            setState({ ...state, message: err.response?.data.message, messageType: 2 });
        }
    }

  return (
    <div className={styles.login}>
        <div className={styles.loginWrapper}>
            <h1 className={styles.heading}>Login</h1>
            {state.message && Alert(state.message, state.messageType)}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type='email'
                    required
                    className={styles.input}
                    placeholder='Email'
                    value={state.email}
                    onChange={({ target }) => setState({ ...state, email: target.value, message: null })}/>
                <input
                    type='password'
                    min={6}
                    required
                    className={styles.input}
                    placeholder='Password'
                    value={state.password}
                    onChange={({ target }) => setState({ ...state, password: target.value, message: null })}
                />
                <button 
                    type='submit'
                    className={styles.button}
                >
                    {state.buttonText}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
