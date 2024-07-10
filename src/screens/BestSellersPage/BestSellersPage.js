import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopViewAllRequest } from '../../redux/actions/shopActions';
import { Skeleton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './BestSellersPage.css'
import { fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';

const BestSellersPage = () => {
  const dispatch = useDispatch();
  const { loading, viewAllWithTitle, error } =  useSelector(state => state.shopData);
  const {cartproducts, responseMessage, loading:cartLoading} = useSelector(state => state.cartProducts);
  const states = useSelector(state=>state)
  console.log(states,'my state')
  useEffect(() => {
    // dispatch(fetchCartProductsRequest(10, 1));
    dispatch(getShopViewAllRequest(1, 10, "best seller"));
  }, [dispatch]);

  useEffect(() => {
    if (responseMessage) {
      // window.location.reload();
      toast.success(responseMessage.success)
      dispatch(resetResponseMessage())
      dispatch(fetchCartProductsRequest(10, 1));
    }
  }, [responseMessage]);

  const getQuantityFromCart = (productId) => {
    const availableProduct = cartproducts?.products?.find(product => product.product_id === productId);
    return availableProduct ? availableProduct.quantity : 0;
  };

  // console.log(viewAllWithTitle,'asdfg')

  if (loading) return (
    <div className='water'>
      <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
      </Stack>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="view-all-product-conatiner">
      {viewAllWithTitle?.map((product, i) => (
        <div
          key={i}
          className="product-section-container"
        >
          <ProductCard
            product={product}
            quantity={getQuantityFromCart(product.product_id)}
          />
        </div>
      ))}
    </div>
  )
}

export default BestSellersPage