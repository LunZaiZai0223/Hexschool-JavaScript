import { displayLoading, hideLoading } from "./utils.js";

export function getAllProductsData () {
  displayLoading();
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/products';

  return axios.get(url).then((response) => {
    const { products } = response.data;

    return products;
  });
}

export function getCartProductsData () {
  const ulr = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';

  return axios.get(ulr).then((response) => {
    const { carts } = response.data;
    const { finalTotal } = response.data;
    const cartData = {
      carts,
      finalTotal
    };

    return cartData;
  });
}

export function deleteAllCartProducts () {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';

  return axios.delete(url).then((response) => {
    const { carts } = response.data;
    const { finalTotal } = response.data;
    const cartData = {
      carts,
      finalTotal
    };

    return cartData;
  });
}

export function addProductsIntoCart (productId) {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';
  const config = {
    data: {
      productId,
      quantity: 1
    }
  };

  // 可能可以在發出請求前至取得之前設定 loading 的東西
  axios.post(url, config);
}

export function changeProductsQuantity (cartId, quantity) {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';
  const config = {
    data: {
      id: cartId,
      quantity
    }
  };

  return axios.patch(url, config).then((response) => {
    const { carts, finalTotal } = response.data;
    const cartData = {
      carts,
      finalTotal
    };

    return cartData;
  });
}

export function deleteOneProduct (cartId) {
  const url = `https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts/${cartId}`;

  return axios.delete(url).then((response) => {
    const { carts, finalTotal } = response.data;
    const cartData = {
      carts,
      finalTotal
    };

    return cartData;
  });
}

export function getCompletedOrderData (inputValue) {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/orders';

  return axios.post(url, inputValue).then((response) => {
    console.log(response.data);
    const { products, total } = response.data;
    const cartData = {
      products,
      total
    };

    return cartData;
  });
}