import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService, User, Status } from 'src/app/employee/services/user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

interface MenuItem {
  link: string;
  title: string;
  icon: string;
  disabled: boolean;
}

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.less'],
})
export class DefaultPageComponent implements OnInit {
  isCollapsed = false;

  shouldMenuDisabled = false;

  status = Status;

  user$: Observable<User>;

  menus$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>(null);

  getMenus(isDisabled: boolean) {
    return [
      {
        link: '/employee/dashboard',
        title: 'ダッシュボード',
        icon: 'dashboard',
        disabled: isDisabled,
      },
      {
        link: '/employee/work-shedule',
        title: '勤務表管理',
        icon: 'calendar',
        disabled: isDisabled,
      },
      {
        link: '/employee/application',
        title: '申請',
        icon: 'form',
        disabled: isDisabled,
      },
      {
        link: '/employee/paid',
        title: '給料詳細',
        icon: 'account-book',
        disabled: isDisabled,
      },
      {
        link: '/employee/document',
        title: '重要書類',
        icon: 'file-excel',
        disabled: isDisabled,
      },
      {
        link: '/employee/account',
        title: '社員詳細',
        icon: 'user',
        disabled: false,
      },
    ];
  }

  logout() {
    this.auth.logout();
    this.route.navigateByUrl('/login');
  }
  constructor(private auth: AuthService, private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser();

    this.userService.getUser().subscribe((user) => {
      this.menus$.next(this.getMenus(user.Status === this.status.Undone));
      if (user.Status === this.status.Undone) {
        this.route.navigateByUrl('employee/account');
      }
    });
  }
}
