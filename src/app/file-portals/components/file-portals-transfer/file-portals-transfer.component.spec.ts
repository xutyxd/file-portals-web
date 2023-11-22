import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalsTransferComponent } from './file-portals-transfer.component';

describe('FilePortalsTransferComponent', () => {
  let component: FilePortalsTransferComponent;
  let fixture: ComponentFixture<FilePortalsTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePortalsTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePortalsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
