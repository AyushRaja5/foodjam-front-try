import React, { useState } from "react";
import './TopRecomendedProducts.css'
import { Button, ButtonGroup, ButtonBase, Stack, Skeleton } from "@mui/material";
import topCreators from '../../../assets/imagespng/topCreators.png';
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../../services/Cart/UserCart";
import { toast } from "react-toastify";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { updateCartProductRequest } from "../../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import ViewAllProducts from "../../ViewAllProducts/ViewAllProducts";
import { ProductCard } from "../../ProductCard/ProductCard";
const TopRecomendedProducts = ({ heading, columns, display_limit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isloading, setIsloading] = useState(false);
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit || 10));
    const { loading: cartProductsLoading, error: cartProductsError, responseMessage } = useSelector((state) => state.cartProducts);
  
    const [show, setShow] = useState(false);
    const [src, setSrc] = useState("");
    const [poster, setPoster] = useState("");
    const cdnBaseURL = 'https://cdn.commeat.com/';
    const truncateText = (text, maxLength) => {
        if (text?.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const handleViewAll = () => {
        navigate(`/view_all_products`, { state: { productsArray: columns } });
    };

    const handleQuantityChange = async(product_id, quantity) => {
        console.log(product_id)
        if(quantity<0) return;
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        if (!user || !user?.sessionToken) {
            toast.error("Please login to add products")
        }
        const token = user ? user.sessionToken : null;
        const accountId = user ? user.account_id : null;

        setIsloading(true)
        const response = await addProductToCart(token, accountId, { product_id, quantity : quantity.toString()});
            
        if (response?.success) {
            setIsloading(false)
          toast.success(response.success);
        } else {
          toast.error(cartProductsError || response?.message);
        }
    };

    const handleAddToCart = async (product) => {
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        if (!user || !user?.sessionToken) {
            toast.error("Please login to add products")
        }
        const token = user ? user.sessionToken : null;
        const accountId = user ? user.account_id : null;

        try {
            const response = await addProductToCart(token, accountId, { product_id: product.product_id, quantity: 1 });
            if (response) {
                toast.success(response?.data.success)
                window.location.reload();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.error(error);
        }
    };

    // if (isloading) {
    //     return (
    //       <div className='userNotification'>
    //         <Stack spacing={1}>
    //           <Skeleton variant="rounded" width={'100%'} height={80} />
    //         </Stack>
    //       </div>
    //     );
    //   }
    
    return (
        <div className="explore-user-section">
            <div className="explore-curation-heading explore-brands">
                <div className="explore-user-heading">
                    <img src={topCreators} alt="topCreators" className="topCreators-img" />
                    <strong>{heading}</strong>
                </div>
                <Button onClick={handleViewAll} className="view-btn">
                    View All
                </Button>
            </div>

            <div className="top-recomended-conatiner">
                {displayData.map((product, i) => (
                    <div
                        key={i}
                        className="video-section-container"
                        onClick={() => {
                            setSrc(`${cdnBaseURL + product.media}`);
                            setPoster(`${cdnBaseURL + product.thumbnail}`);
                            setShow(true);
                        }}
                    >

                        <ProductCard product={product} />
                        {/* <div className='product-card-container'>
                            <img src={`${product.thumb}`} alt='Product Thumbnail' className='product-image' />

                            <span className='bottom-text'>
                                <div className='saved-productinfo'>
                                    {truncateText(product.name, 30)}
                                </div>
                                <div className='saved-product-price'>
                                    &#8377;{product.price}
                                    {product?.quantity ?
                                        <div className="product-price">
                                            <ButtonGroup>
                                                <Button
                                                    className='quantity-btn'
                                                    aria-label="reduce"
                                                    sx={{ borderRadius: '10px' }}
                                                    onClick={() => handleQuantityChange(product.product_id, parseInt(product.quantity) - 1)}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </Button>
                                                <Button className='quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none' }}>{parseInt(product.quantity)}</Button>
                                                <Button
                                                    className='quantity-btn'
                                                    sx={{ borderLeft: 'none', borderRadius: '10px' }}
                                                    aria-label="increase"
                                                    onClick={() => handleQuantityChange(product.product_id, parseInt(product.quantity) + 1)}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                        : <button className='saved-product-add-button'
                                            onClick={(e) => {
                                                // e.stopPropagation();
                                                handleAddToCart(product);
                                            }}>Add</button>
                                    }
                                </div>
                            </span>
                        </div> */}
                    </div>
                ))}
            </div>
            <ViewAllProducts myProducts = {columns}/> 
        </div>
    )
}

export default TopRecomendedProducts