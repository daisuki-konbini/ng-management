import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { SubMenu } from 'src/app/layout/sub-menu/sub-menu.component';
import { SimpleService, Document } from '../../services/simple.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.less'],
})
export class DocumentComponent implements OnInit {
  @ViewChild('greet', { static: false })
  greetDiv: ElementRef;
  document$: Observable<Document>;
  intro = '';

  datas = [];

  typeName$ = new Observable<string>();

  constructor(private simple: SimpleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.document$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        const id = params.has('id') ? parseInt(params.get('id'), 10) : 1;
        return this.simple.getDocument(id);
      }),
    );
  }
}
