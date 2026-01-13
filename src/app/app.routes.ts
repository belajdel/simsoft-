import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Products } from './components/products/products';
import { ProductDetail } from './components/product-detail/product-detail';
import { Partners } from './components/References/partners';
import { Partenaires } from './components/partenaires/partenaires';
import { Contact } from './components/contact/contact';
import { Erreur } from './erreur/erreur';

import { BlogList } from './components/blog/blog-list/blog-list';
import { BlogDetail } from './components/blog/blog-detail/blog-detail';
import { Faq } from './components/faq/faq';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'produits/:id', component: ProductDetail },
  { path: 'produits', component: Products },
  { path: 'partners', component: Partners },
  { path: 'partenaires', component: Partenaires },
  { path: 'contact', component: Contact },
  { path: 'blog', component: BlogList },
  { path: 'blog/:id', component: BlogDetail },
  { path: 'faq', component: Faq },
  { path: '404', component: Erreur },
  { path: '**', redirectTo: '404' }
];
