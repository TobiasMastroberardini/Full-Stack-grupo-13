import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
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
        path: 'products',
        component: ProductsListComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
    },
<<<<<<< HEAD

=======
>>>>>>> 54f32270e60c85a88e09132ee5b1544b72c5fcee
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: '**',  // Ruta para manejar URLs no encontradas
        component: PageNotFoundComponent
    },
];
