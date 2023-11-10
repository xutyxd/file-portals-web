import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsPortalComponent } from './file-portals-portal.component';

describe('FilePortalsPortalComponent', () => {
  let component: FilePortalsPortalComponent;
  let fixture: ComponentFixture<FilePortalsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
