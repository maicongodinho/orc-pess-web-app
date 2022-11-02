import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaAddComponent } from './despesa-add.component';

describe('DespesaAddComponent', () => {
  let component: DespesaAddComponent;
  let fixture: ComponentFixture<DespesaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DespesaAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DespesaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
