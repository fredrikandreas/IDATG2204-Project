export async function getProduct(id) {
    const backendUrl = `${process.env.REACT_APP_BACKEND}/api/products/${id}`;
    const res = await fetch(backendUrl);
    if (!res.ok) {
        throw new Error(`Failed to load product: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}