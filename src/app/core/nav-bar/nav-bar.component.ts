import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { isCurrentUrlIncludedFn } from './utilities/is-current-url-included';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe],
  template: `
    <div>
      <a *ngIf="(isShowHomeButton$ | async) else spacer" routerLink="/">Home</a>
      <a [routerLink]="['my-cart']">View Cart</a>
    </div>
    <ng-template #spacer>
      <span>&nbsp;</span>
    </ng-template>
  `,
  styles: [`
    div {
      background: goldenrod;
      height: 50px;
      padding: 0.25rem;
      margin-bottom: 1rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  cdr = inject(ChangeDetectorRef);
  isShowHomeButton$ = isCurrentUrlIncludedFn('/', '/products')
    .pipe(tap(() => this.cdr.markForCheck()));
}