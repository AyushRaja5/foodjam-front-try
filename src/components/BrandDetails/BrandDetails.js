import { Skeleton, Stack, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleBrandRequest, followBrandRequest } from '../../redux/actions/brandActions';
import { setBreadcrumbTitle, clearBreadcrumbTitle } from '../../redux/actions/breadcrumbActions';
import './BrandDetails.css';
import ExploreVideos from '../../screens/Explore/ExploreVideos/ExploreVideos'
import BrandDetailView from '../BrandDetailView/BrowseByCategory/BrowseByCategory';
import TopRecomendedProducts from '../BrandDetailView/TopRecomendedProducts/TopRecomendedProducts';
import OtherBrands from '../BrandDetailView/OtherBrands/OtherBrands';
import { addProductToCart } from '../../services/Cart/UserCart';
const BrandDetails = () => {
    const { brandId } = useParams();
    const dispatch = useDispatch();
    const { brand, loading, error, followResponse } = useSelector(state => state.brandData);

    useEffect(() => {
        dispatch(fetchSingleBrandRequest(brandId));
    }, [dispatch, brandId]);

    const brandData = brand?.[0];
    console.log(brandData)

    useEffect(() => {
        if (brandData?.name) {
          dispatch(setBreadcrumbTitle(`/brand/${brandId}`, brandData?.name));
        }
    }, [brandData, dispatch, brandId]);
    
    useEffect(() => {
    return () => {
        dispatch(clearBreadcrumbTitle(`/brand/${brandId}`));
    };
    }, [dispatch, brandId]);

    if (loading) return (
        <div className='loading-container'>
            <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="rounded" width={'90%'} height={100} />
                <Skeleton variant="rounded" width={'90%'} height={100} />
                <Skeleton variant="rounded" width={'90%'} height={100} />
                <Skeleton variant="rounded" width={'90%'} height={100} />
            </Stack>
        </div>
    );

    if (error) return <div className='error-message'>Error: {error}</div>;

    return (
        brandData ? (
            <div className='brand-detail-container'>
                <div className='brand-logo-banner'>
                    <div className='brand-icon-container'>
                        <img src={brandData.icon} alt={`${brandData.name} icon`} className='brand-icon' />
                        <div className='brand-name'>{brandData.name}</div>
                    </div>
                </div>

                <div className='brand-image-container'>
                    <img src={brandData.images} alt={`${brandData.name}`} className='brand-image' />
                </div>

                {brandData.browse_by_categories.length > 0 && <BrandDetailView columns={brandData.browse_by_categories} heading='Browse by Categories' />}
                {brandData.products.length > 0 && <TopRecomendedProducts columns={brandData.products} heading={`Top Recomended Products (${brandData.products.length || 0})`} />}
                {brandData.top_videos.length > 0 && <ExploreVideos columns={brandData.top_videos} heading='Top Videos' />}
                {brandData.other_brands.length > 0 && <OtherBrands columns={brandData.other_brands} heading='Other brands' />}
                
                <div className='brand-description'>
                    <strong>About</strong>
                    <div className='campaign-detail-long-info' dangerouslySetInnerHTML={{ __html: brandData?.description }} />
                </div>
            </div>
        ) : (
            <div className='no-data'>No brand data available</div>
        )
    );
}

export default BrandDetails;
