import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpTitleComponent } from './fp-title.component';

describe('FpTitleComponent', () => {
  let component: FpTitleComponent;
  let fixture: ComponentFixture<FpTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FpTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FpTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
