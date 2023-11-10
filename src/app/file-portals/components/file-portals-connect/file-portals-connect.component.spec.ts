import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePortalConnectComponent } from './file-portals-connect.component';

describe('FilePortalConnectComponent', () => {
  let component: FilePortalConnectComponent;
  let fixture: ComponentFixture<FilePortalConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilePortalConnectComponent]
    });
    fixture = TestBed.createComponent(FilePortalConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
