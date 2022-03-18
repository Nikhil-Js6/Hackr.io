import { API } from '../../config'
import axios from 'axios'

const User = ({ userInfo }) => {

    return (
        <div>{JSON.stringify(userInfo)}</div>
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
                redirect: {
                    destination: '/',
                    permanent: false
                },
                props: { userInfo: err.response.data.message }
            }
        }
    }
}

export default User
