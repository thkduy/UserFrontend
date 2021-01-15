const api_url = `https://dack-caro-online-api.herokuapp.com/api`;
// const api_url = `http://localhost:3001/api`; //for testing in local

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

export async function loginGoogle(accessToken, email, name, avatar) {
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
            name: name,
            avatar: avatar
        }),
    }

    const response = await fetch(api_url + `/user/login-google`, options);
    return response;
}

export async function loginFacebook(accessToken, email, name, avatar) {
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
            name: name,
            avatar: avatar
        }),
    }

    const response = await fetch(api_url + `/user/login-facebook`, options);
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

export async function activateAccount(token) {
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
        body: JSON.stringify({ token: token}),
    }

    const response = await fetch(api_url + `/account/activate`, options);
    return response;
}

export async function SendMailChangePassword(email) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/account/send-mail-change-password?email=`+email, options);
    return response;
}

export async function changePassword(token, password) {
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
        body: JSON.stringify({ token: token, password: password}),
    }

    const response = await fetch(api_url + `/account/change-password`, options);
    return response;
}

export async function getAllGameOfUser(token, id) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/user/do/get-all-game-by-userid?id=${id}`, options);
    return response;
}

export async function getRank(token) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/user/do/rank`, options);
    return response;
}

export async function getGame(token, id) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/user/do/get-game-by-gameid?id=${id}`, options);
    return response;
}

export async function getInfo(token, id) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/user/do/get-info?id=${id}`, options);
    return response;
}