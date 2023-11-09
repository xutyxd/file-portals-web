import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesLayoutComponent } from './files-layout.component';

describe('FilesLayoutComponent', () => {
  let component: FilesLayoutComponent;
  let fixture: ComponentFixture<FilesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
