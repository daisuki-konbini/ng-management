import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkScheduleWriteComponent } from './work-schedule-write.component';

describe('WorkScheduleWriteComponent', () => {
  let component: WorkScheduleWriteComponent;
  let fixture: ComponentFixture<WorkScheduleWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkScheduleWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkScheduleWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
