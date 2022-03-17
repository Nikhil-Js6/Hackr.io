import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCookie, isAuth } from "../../util/Auth"
import { API } from '../../config'
import axios from 'axios'

const User = ({ userInfo }) => {

    const router = useRouter();
    const [userInfo, SetUserInfo] = useState('');

    useEffect(() => {
        !isAuth() && router.push('/login');
    }, [isAuth]);
  
    // Using UseEffect:

    useEffect(async () => {
        const token = getCookie('token');
        try {
            const res = await axios.get(`${API}/user`, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            setUserInfo(res.data);
        }
        catch (err) {
            (err.response.data.message) && setUserInfo(err.response.data.message);
        }
    },[]);

    return (
        <div>{JSON.stringify(userInfo)}</div>
    )
}

// Using getInitialProps:

User.getInitialProps  = async (context) => {
    const token = context.req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith(`token=`)).split('=')[1];
    try {
        const res = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return {
            userInfo: res.data
        };
    }
    catch (err) {
        if (err.response.data.message) {
            return { 
                userInfo: err.response.data.message
            }
        }
    }
}

// Using getServerSideProps:

export const getServerSideProps  = async (context) => {
    const token = context.req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith(`token=`)).split('=')[1];
    try {
        const res = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return {
            props: { userInfo: res.data}
        };
    }
    catch (err) {
        if (err.response.data.message) {
            return { 
                props: { userInfo: 'err.response.data.message' }
            }
        }
    }
}

export default User
