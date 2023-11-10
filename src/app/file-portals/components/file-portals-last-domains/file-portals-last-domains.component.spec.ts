import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsLastDomainsComponent } from './file-portals-last-domains.component';

describe('FilePortalsLastDomainsComponent', () => {
  let component: FilePortalsLastDomainsComponent;
  let fixture: ComponentFixture<FilePortalsLastDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsLastDomainsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsLastDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
