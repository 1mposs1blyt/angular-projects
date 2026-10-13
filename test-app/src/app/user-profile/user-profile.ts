import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [NgClass],
  templateUrl: './user-profile.html',
  // styleUrl: './user-profile.css',
})
export class UserProfile {
  role: string = "Administrator";
  isOnline: boolean = true
}
