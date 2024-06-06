// src/redux/sagas/cartSagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_CART_PRODUCTS_REQUEST,
  ADD_TO_CART_REQUEST,
  UPDATE_CART_PRODUCT_REQUEST,
  DELETE_CART_PRODUCT_REQUEST,
  fetchCartProductsSuccess,
  fetchCartProductsFailure,
  addToCartSuccess,
  addToCartFailure,
  updateCartProductSuccess,
  updateCartProductFailure,
  deleteCartProductSuccess,
  deleteCartProductFailure,
  fetchCartProductsRequest
} from '../actions/cartActions';
import {getUserCartService, addProductToCart, updateProductToCart, deleteProductFromCart} from '../../services/Cart/UserCart'

function* fetchCartProducts(action) {
  try {
    const params = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(getUserCartService, token, accountId, params);
    yield put(fetchCartProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchCartProductsFailure(error.message));
  }
}

function* addToCart(action) {
  try {
    const product = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(addProductToCart, token, accountId, product);
    yield put(addToCartSuccess(response.data));
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}

function* updateCartProduct(action) {
  try {
    const product = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(updateProductToCart, token, accountId, product);
    yield put(updateCartProductSuccess(response.data));
  } catch (error) {
    yield put(updateCartProductFailure(error.message));
  }
}

function* deleteCartProduct(action) {
  try {
    const productId = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(deleteProductFromCart, token, accountId, productId);
    yield put(deleteCartProductSuccess(response.data));
  } catch (error) {
    yield put(deleteCartProductFailure(error.message));
  }
}

function* cartSagas() {
  yield takeEvery(FETCH_CART_PRODUCTS_REQUEST, fetchCartProducts);
  yield takeEvery(ADD_TO_CART_REQUEST, addToCart);
  yield takeEvery(UPDATE_CART_PRODUCT_REQUEST, updateCartProduct);
  yield takeEvery(DELETE_CART_PRODUCT_REQUEST, deleteCartProduct);
}

export default cartSagas;
