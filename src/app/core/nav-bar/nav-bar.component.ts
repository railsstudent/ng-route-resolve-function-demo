import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getCurrentUrlFn } from './utilities/currentUrl';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <div>
      <a *ngIf="isShowBackButton else spacer" routerLink="/">Home</a>
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
export class NavBarComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);
  getCurrentUrl$ = getCurrentUrlFn();
  isShowBackButton = true;

  ngOnInit(): void {
    this.getCurrentUrl$.subscribe((url) => {
      this.isShowBackButton = !['/', '/products'].includes(url);
      this.cdr.markForCheck();
    });
  }
}