export const menuLink = [
    {
        title: 'Bosh sahifa',
        icon: 'home-filled',
        path: '/dashboard',
        name: 'dashboard',
        component: ()=> import('@/views/dashboard.vue')
    },
    {
        title: 'Mahsulotlar',
        icon: 'document',
        path: '/products',
        name: 'products',
        component: ()=> import('@/views/product/products.vue')
    },
    {
        title: 'Narhlar',
        icon: 'money',
        path: '/priceproducts',
        name: 'priceproducts',
        component: ()=> import('@/views/product/priceprod.vue')
    },
    {
        title: 'Ovqatlar',
        icon: 'bowl',
        path: '/food',
        name: 'food',
        component: ()=> import('@/views/food/foods.vue')
    },
]