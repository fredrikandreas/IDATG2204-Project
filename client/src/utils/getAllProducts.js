export const getAllProducts = () => {
    let productList = {};
    let db_url = process.env.REACT_APP_DB_URL;
    fetch(db_url)
        .then(res => res.json())
        .then(data => data.forEach(product => productList[product['product_id']] = product));
    return productList;
}