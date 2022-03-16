import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuth } from "../../util/Auth"

const User = () => {

    const router = useRouter();

    useEffect(() => {
        !isAuth() && router.push('/login');
    }, [isAuth]);

    return (
        <div>User</div>
    )
}

export default User
