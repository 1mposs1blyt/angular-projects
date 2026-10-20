import { Component } from '@angular/core';

type PetType = "cat" | "dog" | "hamster" | "rat" | "rabbit" | "fish";

export interface PetData {
  name: string;
  type: PetType;
  age: number;
  hugs: number;
}

@Component({
  selector: 'app-pet',
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css',
})

export class PetComponent {
  pet: PetData = {
    name: 'Барсик',
    type: 'cat',
    age: 2,
    hugs: 0
  };

  addHug() {
    this.pet.hugs++;
  }

  resetHugs() {
    this.pet.hugs = 0;
  }
}