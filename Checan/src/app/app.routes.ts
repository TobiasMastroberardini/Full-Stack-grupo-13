import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeLoginAdminComponent } from './home-login-admin/home-login-admin.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { NewsComponent } from './news/news.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'product/:id',
        component: ProductInfoComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'products',
        component: ProductComponent,
    },
    {
        path: 'products/category/:categoryName',
        component: ProductComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'add-product',
        component: CreateProductComponent,
    },
    {
        path: 'product-list',
        component: ProductsListComponent,
    },
    {
        path: 'edit-product/:id',
        component: EditProductComponent,
    },
    {
        path: 'log-in',
        component: LogInComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
    {
        path: 'home-admin',
        component: HomeLoginAdminComponent,
    },
    {
        path: 'order-list',
        component: OrderListComponent,
    },
    {
        path: 'user-list',
        component: UserListComponent,
    },
    {
        path: '**',  // Ruta para manejar URLs no encontradas
        component: PageNotFoundComponent
    },
];
