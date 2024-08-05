import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProductRequest } from '../../redux/actions/productActions';
import { Button, ButtonGroup, Skeleton, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import './ProductDetailsPage.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactImageMagnify from 'react-image-magnify';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addToCartRequest } from '../../redux/actions/cartActions';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productData);
  const {cartproducts, responseMessage, loading: cartLoading } = useSelector(state => state.cartProducts);

  useEffect(() => {
    dispatch(fetchSingleProductRequest(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (responseMessage) {
      toast.success(responseMessage?.success);
      dispatch(resetResponseMessage());
      dispatch(fetchSingleProductRequest(productId));
      dispatch(fetchCartProductsRequest(10, 1));
    }
  }, [responseMessage, dispatch]);

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

  if (loading || cartLoading) return (
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

  console.log(product)
  return (
    <div className='product-details-container'>
      {product && <ProductDetails data={product.data} handleAddToCart={handleAddToCart}
        handleQuantityChange={handleQuantityChange} cartproducts={cartproducts}/>}
    </div>
  )
}

export default ProductDetailsPage

const ProductDetails = ({ data, handleAddToCart, handleQuantityChange, cartproducts }) => {
  const {
    heading_title,
    description,
    price,
    model,
    manufacturer,
    quantity,
    stock,
    images,
    similar_products
  } = data;

  const CancellationPolicy = "Once the payment for your order is complete, the order cannot be cancelled."

  const getQuantityFromCart = (productId) => {
    const availableProduct = cartproducts?.products?.find(product => product.product_id == productId);
    return availableProduct ? availableProduct.quantity : 0;
  };

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="product-details">
      <div className="product-images">
        <Carousel
          emulateTouch={true}
        >
          {images.map((image, index) => (
            <div key={index} className="product-carousel-img-wrapper imageMagnifyer">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: `Product image ${index + 1}`,
                    isFluidWidth: true,
                    src: image.popup,
                  },
                  largeImage: {
                    src: image.popup,
                    width: 800,
                    height: 1000,
                  },
                  shouldUsePositiveSpaceLens: true,
                  enlargedImagePortalId : 'magnifyImg',
                  enlargedImageContainerDimensions : {
                    width: '150%', height: '100%'
                  }
                  // enlargedImagePosition: 'over'
                }}
              />
            </div>
          ))}
        </Carousel>
        
        <div id='magnifyImg'></div>

        <div className='orderButton-div-web'>
          {quantity > 0 ? (
            <div className='product-view-cart-bookmark-section'>
              <span className='product-bookmark'>Book</span>
              <Link to='/cart'><Button>View Cart</Button></Link>
            </div>
          ) : (
            <div className='product-add-to-cart-bookmark-section'>
              <span className='product-bookmark'>Book</span>
              <Button onClick={(e) => { handleAddToCart(data)}}>Add to Cart</Button>
            </div>
          )}
        </div>


      </div>

      <div className="product-info">
        <h2>{heading_title}</h2>

        <div className='shop-product-price-quantity'>
          <div className='product-price'>&#8377; {data.price}</div>
          <div className='shop-product-quantity'> {data?.quantity ?
            <ButtonGroup>
              <Button
                className='shop-product-quantity-btn'
                aria-label="reduce"
                sx={{ borderRadius: '10px' }}
                onClick={() => handleQuantityChange(data.product_id, parseInt(data.quantity) - 1)}
              >
                <RemoveIcon fontSize="medium" />
              </Button>
              <Button className='shop-product-quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none', color: 'black' }}>{parseInt(data.quantity)}</Button>
              <Button
                className='shop-product-quantity-btn'
                sx={{ borderLeft: 'none', borderRadius: '10px' }}
                aria-label="increase"
                onClick={() => handleQuantityChange(data.product_id, parseInt(data.quantity) + 1)}
              >
                <AddIcon fontSize="medium" />
              </Button>
            </ButtonGroup>
            : <button className='shop-product-add-button'
              onClick={(e) => {
                handleAddToCart(data);
              }}>Add</button>
          }</div>
        </div>
        <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <strong>Product description</strong>
                </AccordionSummary>
                <AccordionDetails>
                    <p dangerouslySetInnerHTML={{ __html: description }}></p>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <strong>Similar Product</strong>
                </AccordionSummary>
                <AccordionDetails className='accordian-similar-product'>
                    <div className='product-details-similar-product'>
                        {similar_products.map((product, index) => (
                            <ProductCard
                                product={product}
                                key={index}
                                quantity={getQuantityFromCart(product.product_id)}
                            />
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <strong>Cancellation Policy</strong>
                </AccordionSummary>
                <AccordionDetails>
                    {CancellationPolicy}
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <strong>Manufacturer Details</strong>
                </AccordionSummary>
                <AccordionDetails>
                <p><strong>Model:</strong> {model}</p>
                <p><strong>Manufacturer:</strong> {manufacturer}</p>
                </AccordionDetails>
            </Accordion>
        </div>

        <div className='orderButton-div-mobile'>
          {quantity > 0 ? (
            <div className='product-view-cart-bookmark-section'>
              <span className='product-bookmark'>Book</span>
              <Link to='/cart'><Button>View Cart</Button></Link>
            </div>
          ) : (
            <div className='product-add-to-cart-bookmark-section'>
              <span className='product-bookmark'>Book</span>
              <Button>Add to Cart</Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};