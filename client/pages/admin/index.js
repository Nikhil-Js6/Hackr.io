import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuth } from "../../util/Auth"

const Admin = () => {

    const router = useRouter();

    useEffect(() => {
        isAuth()?.role !== 'admin' && router.push('/user');
    }, [isAuth]);

    return (
        <div>Admin</div>
    )
}

export default Admin
