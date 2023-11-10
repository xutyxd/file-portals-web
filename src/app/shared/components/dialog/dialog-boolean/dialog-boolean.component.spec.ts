import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBooleanComponent } from './dialog-boolean.component';

describe('DialogBooleanComponent', () => {
  let component: DialogBooleanComponent;
  let fixture: ComponentFixture<DialogBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBooleanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
