import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesProductRequest } from '../../redux/actions/categoriesActions';
import { setBreadcrumbTitle, clearBreadcrumbTitle } from '../../redux/actions/breadcrumbActions';
import { Button, ButtonGroup, Card, CircularProgress, Skeleton, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import './CategoriesPage.css'
import { addToCartRequest, fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LoginDrawer from '../../config/LoginDrawer';

const CategoriesPage = () => {
    const { categoriesId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const limit = 5;
    const { data, error, loading } = useSelector(state => state.categoriesData);
    const { cartproducts, responseMessage, loading: cartLoading } = useSelector(state => state.cartProducts);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

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

    useEffect(() => {
        if (data?.data[0]?.category_name) {
          dispatch(setBreadcrumbTitle(`/categories/${categoriesId}`, data?.data[0]?.category_name));
        }
      }, [data?.data[0], dispatch, categoriesId]);
    
      useEffect(() => {
        return () => {
          dispatch(clearBreadcrumbTitle(`/categories/${categoriesId}`));
        };
      }, [dispatch, categoriesId]);

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
            setDrawerOpen(true);
            return;
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

            <div className='explore-categories-banner'>
                <img src={data?.data[0]?.category_icon} alt={data?.data[0]?.category_name}/>
            </div>

            {data?.metadata && data.metadata.map((brand, index) => (
                <div key={index} className="brand-section">
    
                    <div className="categories-page-top">
                        <div className="categories-page-top-heading">
                            <h2>{brand.brand_name} ({brand.count})</h2>
                        </div>
                        {brand.count > limit && (
                            <Button onClick={() => handleViewAll(groupedProducts[brand.brand_name])} className="categories-view-btn">
                                View All
                            </Button>
                        )}
                    </div>
                    <div className="categories-each-section">
                        {groupedProducts[brand.brand_name]?.slice(0, limit)?.map((product, i) => (
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
            <LoginDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
        </div>
    );
};

export default CategoriesPage

const HorozontalProduct2 = ({ product, cartLoading, quantity, responseMessage, handleAddToCart, handleQuantityChange }) => {
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
export const HorozontalProduct = ({ product, cartLoading, quantity, responseMessage, handleAddToCart, handleQuantityChange }) => {
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

    const calculateDiscount = (originalPrice, specialPrice) => {
        const discount = ((originalPrice - specialPrice) / originalPrice) * 100;
        return Math.round(discount); // Rounding to the nearest whole number
    };

    const textMaxLength = screenWidth > 750 ? 30 : 20;

    return (
        <>
        <Link to={`/product/${product.product_id}`} className='link-product-detail'>
        <Card className='link-shop-brand'>
            <div className='categories-product-container'>
                {product.special_price && (
                    <div className='discount-badge'>
                        {product.offer || calculateDiscount(product.product_price, product.special_price)}% OFF
                    </div>
                )}
                <div className='product-image-container'>
                    <img src={product.product_image} alt='Product' className='product-image' />
                </div>
                <div className='categories-product-details'>
                    <div className='product-name'>
                        {truncateText(product.product_name, textMaxLength)}
                    </div>
                    <div className='product-brand'>
                        {product.manufacturer_name || 'Restaurant Mamih'}
                    </div>
                    <div className='product-price-container'>
                        {product?.special_price && <span className="line-through">&#8377; {product.product_price}</span>}
                        <span className='product-price'>&#8377; {product.special_price || product.product_price}</span>
                    </div>
                    <div className='categories-product-price-add-btn'>
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
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}> {cartLoading ? <CircularProgress size={15} color='primary' /> : 'Add'}</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        </Link>
        </>
    );
};

