import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MyResponse } from 'src/app/share/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    accountName: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.auth.login(data.accountName, data.password).subscribe(() => {
        this.route.navigateByUrl('/employee/dashboard');
      });
    }
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) {}

  ngOnInit(): void {}
}
