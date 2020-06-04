import { Component, OnInit, Input } from '@angular/core';

export interface SubMenu {
  title: string;
  url: string;
  params?: object;
  iconType?: string;
}

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.less'],
})
export class SubMenuComponent implements OnInit {
  @Input() menus: SubMenu[];

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  constructor() {}

  ngOnInit(): void {}
}
