import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";

export const isCurrentUrlIncludedFn = (...excludedRoutes: string[]) => {
  const router = inject(Router);
  const destroyRef$ = inject(DestroyRef);

  return router.events
    .pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e as NavigationEnd),
      map(({url, urlAfterRedirects}) => 
        !excludedRoutes.includes(url) && !excludedRoutes.includes(urlAfterRedirects)),
      takeUntilDestroyed(destroyRef$)
    );
}