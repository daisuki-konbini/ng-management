import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScheduleListComponent } from './work-schedule-list.component';

describe('WorkScheduleListComponent', () => {
  let component: WorkScheduleListComponent;
  let fixture: ComponentFixture<WorkScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
