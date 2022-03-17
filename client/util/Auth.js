import cookie from 'js-cookie'


// Set cookie
export const setCookie = (key, value) => {
    if(typeof window !== undefined){
        cookie.set(key, value, {
            expires: 7,
        });
    }
}

// Get cookie
export const getCookie = key => {
    if(typeof window !== undefined){
        return cookie.get(key);
    }
}

// Remove cookie
export const removeCookie = key => {
    if(typeof window !== undefined){
        cookie.remove(key);
    }
}

// Set Localstorage
export const setLocalstorage = (key, value) => {
    if(typeof window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// Get LocalStorage
export const getLocalstorge = key => {
    if(typeof window !== undefined) {
        localStorage.getItem(key);
    }
}

// Remove from LocalStorage
export const removeLocalstorage = key => {
    if(typeof window !== undefined) {
        localStorage.removeItem(key);
    }
}

// Setting user info in cookie and LocalStorage
export const Authenticate = (response, callback) => {
    setCookie('token', response.data.token);
    setLocalstorage('user', response.data.user);
    callback();
}

// Accessing user info from LocalStorage
export const isAuth = () => {
    if(typeof window !== undefined) {
        const isCookie = getCookie('token');
        if(isCookie) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            }
            else return false
        }
    }
}

// Removing user data from cookie and LocalStorage
export const Logout = () => {
    if(typeof window !== undefined) {
        const isCookie = getCookie('token');
        if(isCookie) {
            removeCookie('token');
            if(localStorage.getItem('user')) {
                removeLocalstorage('user')
            }
        }
    }
}