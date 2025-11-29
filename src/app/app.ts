import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./Components/HomePage/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'NgDemoApp';
}
