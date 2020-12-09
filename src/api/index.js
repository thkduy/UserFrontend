const api_url = 'http://localhost:3001/api';

export async function login(email, password) {
    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({ email: email, password: password }),
    }

    const response = await fetch(api_url + `/user/login`, options);
    return response;
}

export async function loginGoogle(accessToken, email, name) {
    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({ 
            accessToken: accessToken, 
            email: email, 
            name: name 
        }),
    }

    const response = await fetch(api_url + `/user/login-google`, options);
    return response;
}

export async function register(name, email, password) {
    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({ 
            name: name,
            email: email,
            password: password
        }),
    }

    const response = await fetch(api_url + `/user/register`, options);
    return response;
}