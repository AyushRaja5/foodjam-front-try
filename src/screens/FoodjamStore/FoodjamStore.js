import React, { useEffect } from 'react';
import './FoodjamStore.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopRequest } from '../../redux/actions/shopActions';
import { Skeleton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import DealsProducts from './DealsProducts/DealsProducts';
import ProductCategories from './ProductCategories/ProductCategories';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import BestSellersProducts from './BestSellersProducts/BestSellersProducts';
import { fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';
import TopBrands from './TopBrands/TopBrands';
import TodayOffers from './TodayOffers/TodayOffers';
import TopOffersProducts from './TopOffersProducts/TopOffersProducts';
import NotFound from '../NotFound/NotFound';

const FoodjamStore = () => {
  const dispatch = useDispatch();
  const { shop, loading, error } = useSelector(state => state.shopData);
  const { cartproducts, responseMessage, loading: cartLoading } = useSelector(state => state.cartProducts);

  useEffect(() => {
    dispatch(fetchShopRequest());
    dispatch(fetchCartProductsRequest(10, 1));
  }, [dispatch]);

  useEffect(() => {
    if (shop && shop.data?.rows) {
      shop?.data.rows.sort((a, b) => a.sequence - b.sequence);
    }
  }, [shop]);

  useEffect(() => {
    if (responseMessage) {
      toast.success(responseMessage?.success);
      dispatch(resetResponseMessage());
      dispatch(fetchShopRequest());
    }
  }, [responseMessage, dispatch]);

  if (loading || cartLoading) return (
    <div className='water'>
      <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
      </Stack>
    </div>
  );

  if (error) return <NotFound/>;

  const sortedRows = shop?.data?.rows?.slice().sort((a, b) => a.sequence - b.sequence);

  return (
    <div className='foodjamstore-component'>
      {sortedRows?.map((shopItem, index) => (
        <RenderFunction key={index} data={shopItem} cartproducts={cartproducts} responseMessage={responseMessage} />
      ))}
    </div>
  );
};

const RenderFunction = ({ data, cartproducts, responseMessage }) => {
  if (!data.is_visible || !data.columns || data.columns.length === 0) {
    return null;
  }

  switch (data.type) {
    case "Deals_Products":
      return <DealsProducts {...data} />;
    case "Product_Categories":
      return <ProductCategories {...data} />;
    case "Featured_Products":
      return <FeaturedProducts {...data} />;
    case "Best_Sellers_Products":
      return <BestSellersProducts {...data} cartproducts={cartproducts} responseMessage={responseMessage} />;
    case "Top_brands_Products":
      return <TopBrands {...data} />;
    case "Today_offers":
      return <TodayOffers {...data} />;
    case "Products":
      return <TopOffersProducts  {...data} />;
    default:
      return null;
  }
};

export default FoodjamStore;
