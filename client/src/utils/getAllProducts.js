export async function getAllProducts() {
    const backendUrl = `${process.env.REACT_APP_BACKEND}/api/products`;
    console.log(backendUrl);
    const res = await fetch(backendUrl);
    if (!res.ok) {
        throw new Error(`Failed to load products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}