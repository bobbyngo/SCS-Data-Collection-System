import axios from 'axios';

const login = async (username, password) => {
    const res = await axios.post(
        'http://localhost:4000/api/auth/signin',
        {
            username,
            password_hash: password,
        },
        {
            withCredentials: true,
        }
    );
    return res.data;
};

const register = async (username, password, email, siteId, roleId) => {
    const res = await axios.post(
        'http://localhost:4000/api/auth/signup',
        {
            username,
            password,
            email,
            site_id: siteId,
            role_id: roleId,
        },
        {
            withCredentials: true,
        }
    );
    return res;
};

export { login, register };
