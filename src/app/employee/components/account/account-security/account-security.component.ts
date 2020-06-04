import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, Profile } from 'src/app/employee/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.less'],
})
export class AccountSecurityComponent implements OnInit {
  securityForm = this.fb.group({
    PhoneNumber: ['', Validators.required],
    EmailAddress: ['', [Validators.required, Validators.email]],
  });

  profile: Profile;

  submit() {
    for (const i in this.securityForm.controls) {
      if (this.securityForm.controls.hasOwnProperty(i)) {
        this.securityForm.controls[i].markAsDirty();
        this.securityForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.securityForm.valid) {
      Object.assign(this.profile, this.securityForm.value);
      this.userService.updateUser(this.profile).subscribe((res) => {
        this.message.success('更新成功');
      });
    }
  }

  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.profile = user.UserProfile;
      this.securityForm.patchValue(user.UserProfile);
    });
  }
}
