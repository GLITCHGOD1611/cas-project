import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeachersComponent } from './manage-teachers.component';

describe('ManageTeachersComponent', () => {
  let component: ManageTeachersComponent;
  let fixture: ComponentFixture<ManageTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
