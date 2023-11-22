import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsDownloadsComponent } from './file-portals-downloads.component';

describe('FilePortalsDownloadsComponent', () => {
  let component: FilePortalsDownloadsComponent;
  let fixture: ComponentFixture<FilePortalsDownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsDownloadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
