import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsDomainComponent } from './file-portals-domain.component';

describe('FilePortalsDomainComponent', () => {
  let component: FilePortalsDomainComponent;
  let fixture: ComponentFixture<FilePortalsDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsDomainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
