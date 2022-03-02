import { useState } from 'react'
import styles from '../styles/Register.module.css'
import { API } from '../config'
import axios from 'axios'
import { Alert } from '../util/Alerts'


const Register = () => {

    const [state, setState] = useState({
        name : 'nikhil',
        email: 'nikhil@gmail.com',
        password: '12345678',
        buttonText: 'Register',
        message: null,
        messageType: Number,
    });
    
    const { name, email, password } = state;
    let formData = { name, email, password };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Processing...' });
        try {
            const res = await axios.post(`${API}/register`, formData);
            setState({ ...state, message: res.data.message, messageType: 1 });
        }catch(err) {
            setState({ ...state, message: err.response.data.message, messageType: 2 });
        }
        setTimeout(() => {
            setState({
                name: String,
                email: String,
                password: String,
                buttonText: 'Register',
                message: null,
            });
        }, 3500);
    }

  return (
    <div className={styles.register}>
        <div className={styles.registerWrapper}>
            <h1 className={styles.heading}>Register</h1>
            {state.message && Alert(state.message, state.messageType)}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type='text'
                    min='3'
                    required
                    className={styles.input}
                    placeholder='Username'
                    value={state.name}
                    onChange={({ target }) => setState({ ...state, name: target.value })}
                />
                <input
                    type='email'
                    required
                    className={styles.input}
                    placeholder='Email'
                    value={state.email}
                    onChange={({ target }) => setState({ ...state, email: target.value })}/>
                <input
                    type='password'
                    min={6}
                    required
                    className={styles.input}
                    placeholder='Password'
                    value={state.password}
                    onChange={({ target }) => setState({ ...state, password: target.value })}
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

export default Register