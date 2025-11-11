import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout {

}
