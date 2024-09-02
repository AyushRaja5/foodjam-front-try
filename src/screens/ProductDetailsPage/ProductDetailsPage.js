import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProductRequest } from '../../redux/actions/productActions';
import { Button, ButtonGroup, Skeleton, Stack, Dialog, DialogContent, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import './ProductDetailsPage.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addToCartRequest } from '../../redux/actions/cartActions';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import mailIcon from '../../assets/imagespng/mailIcon.png';
import { MailLockOutlined } from '@mui/icons-material';
const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.productData);
  const { cartproducts, responseMessage, loading: cartLoading } = useSelector(state => state.cartProducts);

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
      toast.error("Please login to add products");
      return;
    }
    dispatch(addToCartRequest(product?.product_id, "1"));
  };

  const handleQuantityChange = async (product_id, quantity) => {
    if (quantity < 0) return;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    if (!user || !user?.sessionToken) {
      toast.error("Please login to add products");
      return;
    }
    dispatch(addToCartRequest(product_id, quantity.toString()));
  };

  if (loading || cartLoading) {
    return (
      <div className='water'>
        <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          ))}
        </Stack>
      </div>
    );
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }

  return (
    <div className='product-details-container'>
      {product && (
        <ProductDetails
          data={product?.data}
          handleAddToCart={handleAddToCart}
          handleQuantityChange={handleQuantityChange}
          cartproducts={cartproducts}
        />
      )}
    </div>
  );
};

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
    similar_products,
    offer,
    special
  } = data;
  console.log(data,'data:')
  const CancellationPolicy = "Once the payment for your order is complete, the order cannot be cancelled.";
  const RefundPolicy = "This product cannot be returned, but incase you receive the product that is physicall damaged, has missing parts or accessries, defective or different from the description, \n Please reach out to our support team.";

  const getQuantityFromCart = (productId) => {
    const availableProduct = cartproducts?.products?.find(product => product.product_id == productId);
    return availableProduct ? availableProduct.quantity : 0;
  };

  const [expanded, setExpanded] = useState('panel1');
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="product-details">
      <div className="product-images">
        <Carousel emulateTouch>
          {images.map((image, index) => (
            <div key={index} className="product-carousel-img-wrapper" onClick={() => handleClickOpen(image.popup)}>
              <img src={image.popup} alt={`Product image ${index + 1}`} className='product-carousel-img' />
            </div>
          ))}
        </Carousel>

        <div className='orderButton-div-web'>
          {quantity > 0 ? (
            <div className='product-view-cart-bookmark-section'>
              <span className='product-bookmark'><BookmarkBorderIcon className="custom-bookmark-icon" /></span>
              <Link to='/cart'><Button>View Cart</Button></Link>
            </div>
          ) : (
            <div className='product-add-to-cart-bookmark-section'>
              <span className='product-bookmark'><BookmarkBorderIcon className="custom-bookmark-icon" fontSize='5px' /></span>
              <Button onClick={() => handleAddToCart(data)}>Add to Cart</Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent
          sx={{
            padding: 0,
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>

      <div className="product-info">
        <h2>{heading_title}</h2>
        {offer && <span className="offer-text">{offer || '10 % off'}</span>}
        <div className='shop-product-price-quantity'>
          <div className='product-price'>
          {offer ? (
              <div className='price-old-price'>
               <span className="line-through"> &#8377; {price}</span>
               <span><strong> &#8377; {price}</strong></span>
              </div>
            ) : (
              <span>&#8377; {price}</span>
            )}
          </div>
          <div className='shop-product-quantity'>
            {quantity > 0 ? (
              <ButtonGroup>
                <Button
                  className='shop-product-quantity-btn'
                  aria-label="reduce"
                  sx={{ borderRadius: '10px' }}
                  onClick={() => handleQuantityChange(data.product_id, parseInt(quantity) - 1)}
                >
                  <RemoveIcon fontSize="medium" />
                </Button>
                <Button className='shop-product-quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none', color: 'black' }}>
                  {parseInt(quantity)}
                </Button>
                <Button
                  className='shop-product-quantity-btn'
                  sx={{ borderLeft: 'none', borderRadius: '10px' }}
                  aria-label="increase"
                  onClick={() => handleQuantityChange(data.product_id, parseInt(quantity) + 1)}
                >
                  <AddIcon fontSize="medium" />
                </Button>
              </ButtonGroup>
            ) : (
              <Button className='shop-product-add-button' onClick={() => handleAddToCart(data)}>
                Add
              </Button>
            )}
          </div>
        </div>

        <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
              <Typography><strong>Product description</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography dangerouslySetInnerHTML={{ __html: description }} />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
              <Typography><strong>Similar Product</strong></Typography>
            </AccordionSummary>
            <AccordionDetails className='accordian-similar-product'>
              <div className='product-details-similar-product'>
                {similar_products.map((product, index) => (
                  <ProductCard key={index} product={product} quantity={getQuantityFromCart(product.product_id)} />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
              <Typography><strong>Cancellation Policy</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{CancellationPolicy}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header">
              <Typography><strong>Refund Policy</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{RefundPolicy}</Typography>
              <SupportCard />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5-content" id="panel5-header">
              <Typography><strong>More from this Category</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='product-details-similar-product'>
                {similar_products.map((product, index) => (
                  <ProductCard key={index} product={product} quantity={getQuantityFromCart(product.product_id)} />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

const SupportCard = () => {
  return (
    <>
      <div className="support-card">
        <img src={mailIcon} alt='emailBox' className="support-icon" />
        <div className="support-text">
          <p><strong>Need Support?</strong></p>
          <p>E-mail us at: <span className="support-email">support@foodjam.in</span></p>
        </div>
      </div>
    </>
  );
};
