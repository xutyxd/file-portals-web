import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsLayoutComponent } from './file-portals-layout.component';

describe('FilePortalsLayoutComponent', () => {
  let component: FilePortalsLayoutComponent;
  let fixture: ComponentFixture<FilePortalsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
