import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Products } from '../products/products';
import { Partners } from '../partners/partners';
import { Partenaires } from '../partenaires/partenaires';

@Component({
  selector: 'app-home',
  imports: [Hero, Products, Partners, Partenaires],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
