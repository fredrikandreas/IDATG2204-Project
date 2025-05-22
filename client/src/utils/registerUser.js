import { BACKEND_URL, PATH_REGISTER } from "./constants";

export const registerUser = async (username,
                                   password,
                                   email,
                                   first_name,
                                   last_name,
                                   street,
                                   city,
                                   postal_code,
                                   phone_number,
                                   date_of_birth,
                                   ) => {
    let api_url = BACKEND_URL + PATH_REGISTER;

    const res = await fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
            email,
            first_name,
            last_name,
            street,
            city,
            postal_code,
            phone_number,
            date_of_birth,
        }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
};