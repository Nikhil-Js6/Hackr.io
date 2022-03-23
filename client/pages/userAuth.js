import axios from 'axios';
import { API } from '../config';
import { getCookie } from '../util/auth';

const userAuth = Page => {
    const UserAuth = props => <Page {...props} />;
    UserAuth.getInitialProps = async context => {
        const token = context.req.headers.cookie?.split(';').find(cookie => cookie.trim().startsWith(`token=`)).split('=')[1];
        let user = null;

        if (token) {
            try {
                const response = await axios.get(`${API}/user`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: 'application/json'
                    }
                });
                user = response.data;
            } catch (error) {
                if (error.response.status === 401) {
                    user = null;
                }
            }
        }

        if (user === null) {
        // redirect
            context.res.writeHead(302, {
                Location: '/'
            });
            context.res.end();
        } else {
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                user,
                token
            };
        }
    };

    return UserAuth;
};

export default userAuth;
