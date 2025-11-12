import { Component, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { toast, Toaster } from 'sonner';

@Component({
  selector: 'app-home-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout {
  constructor(){
     
  }
}
