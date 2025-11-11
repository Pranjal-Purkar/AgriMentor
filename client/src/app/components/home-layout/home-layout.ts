import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Home } from "../home/home";

@Component({
  selector: 'app-home-layout',
  imports: [Navbar, Home],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout {

}
