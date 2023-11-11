import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsFilesComponent } from './file-portals-files.component';

describe('FilePortalsFilesComponent', () => {
  let component: FilePortalsFilesComponent;
  let fixture: ComponentFixture<FilePortalsFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
