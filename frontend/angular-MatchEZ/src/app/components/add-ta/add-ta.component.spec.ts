import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaComponent } from './add-ta.component';

describe('AddTaComponent', () => {
  let component: AddTaComponent;
  let fixture: ComponentFixture<AddTaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
