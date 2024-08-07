const breadcrumbRoutes = [
  // Profile
  // { path: '/profile/:id/:tab', label: 'Profile', parents: [{label:'Profile',url:'/profile/:id/:tab'}] },
  
  // Explore
  // { path: '/explore', label: 'Explore' },
  { path: '/view_all_products', label: 'View All Products', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/view_all_brands', label: 'View All Brands', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/view_all_creators', label: 'View All Creators', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/view_all_affiliates', label: 'View All Affiliates', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/view_all_videos/:title', label: 'title', parents: [{label:'Explore',url:'/explore'},{label:'View All Videos',url:null}] },
  { path: '/top_foodjammers', label: 'Top Foodjammers',parents: [{label:'Explore',url:'/explore'}] },
  { path: '/brand/:brandId', label: 'brandId', parents: [{label:'Explore',url:'/explore'},{label:'Brand Details',url:null}] },
  { path: '/contests', label: 'Contests', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/contest_details/:contestId', label: 'contestId', parents: [{label:'Explore',url:'/explore'},{label:'Contests',url:'/contests'},{label:'Contest Detail',url:null}] },
  { path: '/rewards', label: 'Rewards', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/rewardsInfo/:rewardId', label: 'rewardId', parents: [{label:'Explore',url:'/explore'},{label:'Rewards',url:'/rewards'},{label:'Reward Detail',url:null}] },
  { path: '/workshops', label: 'Workshops', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/campaigns', label: 'Campaigns', parents: [{label:'Explore',url:'/explore'}] },
  { path: '/campaign_details/:campaignId', label: 'campaignId', parents: [{label:'Explore',url:'/explore'},{label:'Campaign Detail',url:null}] },
  
  // Shop
  // { path: '/shop', label: 'Shop' },
  { path: '/top_brands', label: 'Top Brands', parents: [{label:'Shop',url:'/shop'}] },
  { path: '/best_sellers', label: 'Best Sellers', parents: [{label:'Shop',url:'/shop'}] },
  { path: '/top_offers', label: 'Top Offers', parents: [{label:'Shop',url:'/shop'}] },
  { path: '/categories/:categoriesId', label: 'categoriesId', parents: [{label:'Shop',url:'/shop'}, {label:'Categories',url:null}] },
  { path: '/product/:productId', label: 'Product Details', parents: [{label:'Shop',url:'/shop'}] },
  
  // Settings
  // { path: '/setting', label: 'Settings' },
  { path: '/my_orders', label: 'My Orders', parents: [{label:'Settings',url:'/setting'}] },
  { path: '/addresses', label: 'Addresses', parents: [{label:'Settings',url:'/setting'}] },
  { path: '/preferences', label: 'Preferences', parents: [{label:'Settings',url:'/setting'}] },
  { path: '/bank_details', label: 'Bank Details', parents: [{label:'Settings',url:'/setting'}] },
  { path: '/withdraw', label: 'Withdraw', parents: [{label:'Settings',url:'/setting'}] },
  { path: '/withdraw/tobewithdraw', label: 'Withdraw Balance', parents: [{label:'Settings',url:'/setting'},{label:'Withdrawing',url:null}] },
  { path: '/notifications', label: 'Notifications', parents: [{label:'Settings',url:'/setting'}] },
  { path: '/my_orders/:orderId', label: 'Order Detail', parents: [{label:'Settings',url:'/setting'}] },
];

export default breadcrumbRoutes;
