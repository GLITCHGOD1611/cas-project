import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorageTestComponent } from './local-storage-test.component';

describe('LocalStorageTestComponent', () => {
  let component: LocalStorageTestComponent;
  let fixture: ComponentFixture<LocalStorageTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalStorageTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalStorageTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
