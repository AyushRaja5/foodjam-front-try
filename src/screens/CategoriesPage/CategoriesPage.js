import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesProductRequest } from '../../redux/actions/categoriesActions';
import { Button, ButtonGroup, CircularProgress, Skeleton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import './CategoriesPage.css'
import { addToCartRequest, fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CategoriesPage = () => {
    const { categoriesId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, error, loading } = useSelector(state => state.categoriesData);
    const { cartproducts, responseMessage, loading: cartLoading } = useSelector(state => state.cartProducts);

    useEffect(() => {
        dispatch(getCategoriesProductRequest(categoriesId));
        dispatch(fetchCartProductsRequest(10, 1));
    }, [dispatch, categoriesId]);

    useEffect(() => {
        if (responseMessage) {
            // window.location.reload();
            toast.success(responseMessage.success)
            dispatch(resetResponseMessage())
            dispatch(fetchCartProductsRequest(10, 1));
        }
    }, [responseMessage, dispatch]);

    if (loading) return (
        <div className='water'>
            <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
                <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
                <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
                <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
                <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
            </Stack>
        </div>
    );

    if (error) {
        toast.error(error);
        return <div>Error: {error}</div>;
    }

    const handleAddToCart = async (product) => {
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        if (!user || !user?.sessionToken) {
            toast.error("Please login to add products")
        }
        dispatch(addToCartRequest(product?.product_id, "1"))
    };

    const handleQuantityChange = async (product_id, quantity) => {
        if (quantity < 0) return;
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        if (!user || !user?.sessionToken) {
            toast.error("Please login to add products")
        }
        dispatch(addToCartRequest(product_id, quantity.toString()))
    };

    const getQuantityFromCart = (productId) => {
        const availableProduct = cartproducts?.products?.find(product => product.product_id == productId);
        return availableProduct ? availableProduct.quantity : 0;
    };

    const groupedProducts = data?.data?.reduce((acc, product) => {
        const manufacturer = product.manufacturer_name;
        if (!acc[manufacturer]) {
            acc[manufacturer] = [];
        }
        acc[manufacturer].push(product);
        return acc;
    }, {});

    const handleViewAll = (products) => {
        const mappedProducts = products.map(product => ({
            thumb: product.product_image,
            text: product.product_name,
            price: product.product_price,
            quantity: product.quantity,
            product_id: product.product_id,
        }));

        console.log(mappedProducts);
        navigate('/view_all_products', { state: { productsArray: mappedProducts } });
    };
    return (
        <div className="view-all-categories-conatiner">
            {data?.metadata && data.metadata.map((brand, index) => (
                <div key={index} className="brand-section">
    
                    <div className="categories-page-top">
                        <div className="categories-page-top-heading">
                            <h2>{brand.brand_name} ({brand.count})</h2>
                        </div>
                        <Button onClick={() => handleViewAll(groupedProducts[brand.brand_name])} className="categories-view-btn">
                            View All
                        </Button>
                    </div>
                    <div className="categories-each-section">
                        {groupedProducts[brand.brand_name]?.map((product, i) => (
                            <HorozontalProduct key={i} product={product}
                                cartLoading={cartLoading}
                                quantity={getQuantityFromCart(product.product_id)}
                                responseMessage={responseMessage}
                                handleAddToCart={handleAddToCart}
                                handleQuantityChange={handleQuantityChange} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoriesPage

const HorozontalProduct = ({ product, cartLoading, quantity, responseMessage, handleAddToCart, handleQuantityChange }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const truncateText = (text, maxLength) => {
        if (text?.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const textMaxLength = screenWidth > 750 ? 40 : 20;

    return (
        <Link className='link-shop-brand'>
            <div className='categories-product-container'>
                <div className='categories-product-left'>
                    <Link to={`/product/${product.product_id}`} className='link-shop-brand'>
                        <div className='categories-product-text'>{truncateText(product.product_name, textMaxLength)}</div>
                    </Link>
                    <div className='categories-product-price-add-btn'>
                        <div className='categories-product-price'>&#8377; {product.product_price}</div>
                        <div>
                            {quantity ?
                                <div className="categories-product-qty">
                                    <ButtonGroup>
                                        <Button
                                            className='quantity-btn'
                                            aria-label="reduce"
                                            sx={{ borderRadius: '10px' }}
                                            onClick={() => handleQuantityChange(product.product_id, parseInt(quantity || product.quantity) - 1)}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </Button>
                                        <Button className='quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none' }}>{cartLoading ? <CircularProgress size={15} color='primary' sx={{ display: 'flex', textAlign: 'center' }} /> : parseInt(quantity || product.quantity)}</Button>
                                        <Button
                                            className='quantity-btn'
                                            sx={{ borderLeft: 'none', borderRadius: '10px' }}
                                            aria-label="increase"
                                            onClick={() => handleQuantityChange(product.product_id, parseInt(quantity || product.quantity) + 1)}
                                        >
                                            <AddIcon fontSize="small" />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                                : <button className='saved-product-add-button'
                                    onClick={(e) => {
                                        handleAddToCart(product);
                                    }}> {cartLoading ? <CircularProgress size={15} color='primary' /> : 'Add'}</button>
                            }
                        </div>
                    </div>
                </div>
                <Link to={`/product/${product.product_id}`} className='link-shop-brand'>
                    <div className='categories-product-right'>
                        <img src={product.product_image} />
                    </div>
                </Link>
            </div>
        </Link>
    )
}
