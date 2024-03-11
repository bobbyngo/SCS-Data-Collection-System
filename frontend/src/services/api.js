import axios from 'axios';

const login = async (username, password) => {
    const res = await axios.post('http://localhost:4000/api/auth/signin', {
        username,
        password_hash: password,
    });
    console.log(res);
    return res.data;
};

const register = async (username, password) => {
    // const response = await fetch('http://localhost:4000/api/auth/signin', {
    //     method: 'POST',
    //     body: JSON.stringify({ username, password_hash: password }),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
    // const user = await response.json();
    // console.log(user);
    // return user;
};

export { login, register };
