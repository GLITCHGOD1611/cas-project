import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourceComponent } from './add-cource.component';

describe('AddCourceComponent', () => {
  let component: AddCourceComponent;
  let fixture: ComponentFixture<AddCourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
