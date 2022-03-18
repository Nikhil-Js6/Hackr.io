import { useState } from 'react'
import styles from '../../../styles/Forgot.module.css'
import { API } from '../../../config'
import axios from 'axios'
import { Alert } from '../../../util/Alerts'


const Forgot = () => {

    const [state, setState] = useState({
        email: '',
        buttonText: 'Forgot Password',
        message: null,
        messageType: Number,
    });

    const { email } = state;

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Processing...' });
        try {
            const res = await axios.put(`${API}/forgot-password`, { email });
            setState({ ...state, message: res.data.message, messageType: 1 });
        }
        catch (err) {
            setState({ ...state, message: err.response?.data.message, messageType: 2 });
        }
    }

  return (
    <div className={styles.forgotWrapper}>
        <div className={styles.forgot}>
            <h1 className={styles.heading}>Forgot the Password</h1>
            {state.message && Alert(state.message, state.messageType)}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type='email'
                    required
                    className={styles.input}
                    placeholder='Enter your Email'
                    value={state.email}
                    onChange={({ target }) => setState({ ...state, email: target.value, message: null })}
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

export default Forgot
