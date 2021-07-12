import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

export interface SignInForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private loadingService: LoadingService
  ) {}

  signIn({ email, password }: SignInForm) {
    if (!email || !password) {
      return;
    }

    this.loadingService.start();
    from(this.auth.signIn({ email, password }))
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => {
        this.router.navigate(['catalogue']);
      });
  }

  ngOnInit(): void {}
}
