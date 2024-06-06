import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductsListComponent } from './product/product.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'product-info',
        component: ProductInfoComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'products',
        component: ProductsListComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
    },
    {
        path: '**',  // Ruta para manejar URLs no encontradas
        component: PageNotFoundComponent
    },
];
