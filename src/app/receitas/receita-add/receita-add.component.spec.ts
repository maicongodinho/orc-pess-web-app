import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaAddComponent } from './receita-add.component';

describe('ReceitaAddComponent', () => {
  let component: ReceitaAddComponent;
  let fixture: ComponentFixture<ReceitaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceitaAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceitaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
