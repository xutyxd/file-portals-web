import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNewUserComponent } from './settings-new-user.component';

describe('SettingsNewUserComponent', () => {
  let component: SettingsNewUserComponent;
  let fixture: ComponentFixture<SettingsNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsNewUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
