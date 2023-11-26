import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsDownloadsStatsComponent } from './file-portals-downloads-stats.component';

describe('FilePortalsDownloadsStatsComponent', () => {
  let component: FilePortalsDownloadsStatsComponent;
  let fixture: ComponentFixture<FilePortalsDownloadsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsDownloadsStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsDownloadsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
