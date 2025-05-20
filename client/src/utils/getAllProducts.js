export async function getAllProducts() {
    const apiUrl = `${process.env.REACT_APP_BACKEND}/api/products`;
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}