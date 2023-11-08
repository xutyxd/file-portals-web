import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCoreComponent } from './layout-core.component';

describe('LayoutCoreComponent', () => {
  let component: LayoutCoreComponent;
  let fixture: ComponentFixture<LayoutCoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutCoreComponent]
    });
    fixture = TestBed.createComponent(LayoutCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
