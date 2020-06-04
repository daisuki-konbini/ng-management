import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, Profile } from 'src/app/employee/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.less'],
})
export class AccountAddressComponent implements OnInit {
  addressForm = this.fb.group({
    postCode: ['', Validators.required],
    address: ['', Validators.required],
  });

  profile: Profile;
  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {}

  submit() {
    for (const i in this.addressForm.controls) {
      if (this.addressForm.controls.hasOwnProperty(i)) {
        this.addressForm.controls[i].markAsDirty();
        this.addressForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.addressForm.valid) {
      this.profile.Address = JSON.stringify(this.addressForm.value);
      this.userService.updateUser(this.profile).subscribe((res) => {
        this.message.success('更新成功');
      });
    }
  }
  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.profile = user.UserProfile;
      if (this.profile.Address) {
        this.addressForm.setValue(JSON.parse(this.profile.Address));
      }
      this.addressForm.patchValue(user.UserProfile);
    });
  }
}
