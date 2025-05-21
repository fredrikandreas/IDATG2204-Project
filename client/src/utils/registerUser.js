import { BACKEND_URL, PATH_REGISTER } from "./constants";

export const registerUser = async (username, password, email) => {
    let api_url = BACKEND_URL + PATH_REGISTER;

    const res = await fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
};