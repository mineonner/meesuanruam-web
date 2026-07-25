import { Component } from '@angular/core';
import { BrowserScreenService } from '../core/services/browser-screen.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _screen:BrowserScreenService
  ){

  }
}
