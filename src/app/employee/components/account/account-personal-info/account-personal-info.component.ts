import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, Profile, User } from 'src/app/employee/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.less'],
})
export class AccountPersonalInfoComponent implements OnInit {
  profileForm = this.fb.group({
    LastName: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastNameKana: ['', Validators.required],
    FirstNameKana: ['', Validators.required],
    Sex: ['', Validators.required],
    BirthDay: [new Date(), Validators.required],
    JoinDate: [new Date(), Validators.required],
    Residence: ['', Validators.required],
    ResidenceDeadline: [new Date(), Validators.required],
    MyNumber: ['', Validators.required],
  });
  profile: Profile;

  user$: Observable<User>;

  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {}

  get sex() {
    return this.profileForm.value.Sex;
  }

  submit() {
    for (const i in this.profileForm.controls) {
      if (this.profileForm.controls.hasOwnProperty(i)) {
        this.profileForm.controls[i].markAsDirty();
        this.profileForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.profileForm.valid) {
      Object.assign(this.profile, this.profileForm.value);
      this.userService.updateUser(this.profile).subscribe((res) => {
        this.message.success('更新成功');
      });
    }
  }
  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.profile = user.UserProfile;
      this.profileForm.patchValue(user.UserProfile);
    });
  }
}
