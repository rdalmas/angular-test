import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'


@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  imports: [NgOptimizedImage]
})
export class WelcomeComponent {

}
