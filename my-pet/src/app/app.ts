import { Component } from '@angular/core';
import { PetComponent } from './pet/pet';

@Component({
  selector: 'app-root',
  imports: [PetComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App { }
