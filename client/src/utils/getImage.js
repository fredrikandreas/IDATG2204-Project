import {BACKEND_URL} from "./constants";

export const getImage = (image_url) => {
    return `${BACKEND_URL}/uploads/${image_url}`;
}