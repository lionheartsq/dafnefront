import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  title = 'emprendimientofront';

  constructor(public authService: LoginService, public router: Router, private breakpointObserver: BreakpointObserver) { }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['auth']);
  }

}
