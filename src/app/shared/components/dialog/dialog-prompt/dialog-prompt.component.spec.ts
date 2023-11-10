import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromptComponent } from './dialog-prompt.component';

describe('DialogPromptComponent', () => {
  let component: DialogPromptComponent;
  let fixture: ComponentFixture<DialogPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
