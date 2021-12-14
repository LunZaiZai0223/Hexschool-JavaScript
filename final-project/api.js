export default function getAllProductsData () {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/products';
  return axios.get(url).then((response) => {
    const { products } = response.data;
    // console.log(products);
    return products;
  });
}