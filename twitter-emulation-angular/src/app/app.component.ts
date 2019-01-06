import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<div class="bg-success p-2 text-center text-white">
    This is Twitter
    </div>`
})
export class AppComponent {
  title = 'twitter-emulation-angular';
}
