import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsDownloadsListComponent } from './file-portals-downloads-list.component';

describe('FilePortalsDownloadsListComponent', () => {
  let component: FilePortalsDownloadsListComponent;
  let fixture: ComponentFixture<FilePortalsDownloadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsDownloadsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsDownloadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
