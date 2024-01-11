import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaAllocationsTableComponent } from './ta-allocations-table.component';

describe('TaAllocationsTableComponent', () => {
  let component: TaAllocationsTableComponent;
  let fixture: ComponentFixture<TaAllocationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaAllocationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaAllocationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
