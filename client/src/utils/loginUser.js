import { BACKEND_URL, PATH_LOGIN } from "./constants";

export const loginUser = async (username, password) => {
    const api_url = BACKEND_URL + PATH_LOGIN;
    const res = await fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
};