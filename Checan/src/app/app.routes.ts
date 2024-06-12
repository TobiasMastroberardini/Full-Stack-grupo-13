import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductListByCategoryComponent } from './product-list-by-category/product-list-by-category.component';
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
        path: 'product/filter',
        component: ProductListByCategoryComponent
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'login',
        component: LogInComponent,
    },
    {
        path: '**',  // Ruta para manejar URLs no encontradas
        component: PageNotFoundComponent
    },
];
