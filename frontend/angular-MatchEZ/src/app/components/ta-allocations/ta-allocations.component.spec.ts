import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaAllocationsComponent } from './ta-allocations.component';

describe('TaAllocationsComponent', () => {
  let component: TaAllocationsComponent;
  let fixture: ComponentFixture<TaAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaAllocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
