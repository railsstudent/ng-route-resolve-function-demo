import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  template: `
    <div>
      <h2>Signal Demo</h2>
      <app-nav-bar />
      <router-outlet />
    </div>`,
  styles: [`
    div {
      padding: 0.75rem;
    }

    h2 {
      margin-bottom: 0.75rem;
    }
  `],
})
export class AppComponent {
  title = 'ng-view-providers-demo';
}
