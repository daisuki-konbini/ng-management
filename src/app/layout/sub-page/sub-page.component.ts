import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface SubMenu {
  title: string;
  url: string;
  params?: object;
  iconType?: string;
}

@Component({
  selector: 'app-sub-page',
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.less'],
})
export class SubPageComponent implements OnInit {
  menus: SubMenu[] = [];

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const baseUrl = '/' + this.route.parent.snapshot.url[0].path + '/' + this.route.routeConfig.path;
    this.route.routeConfig.children.forEach((child) => {
      this.menus.push({
        title: child.data.title,
        url: baseUrl + '/' + child.path,
        params: child.data.params,
        iconType: child.data.iconType,
      });
    });
  }
}
