import { Component } from '@angular/core';
import { FilePortalsService } from '../../services/file-portals.service';

@Component({
  selector: 'app-file-portals-connect',
  templateUrl: './file-portals-connect.component.html',
  styleUrls: ['./file-portals-connect.component.scss']
})
export class FilePortalsConnectComponent {

    public domain: string = '';

    constructor(private filePortalsService: FilePortalsService) { }

    public connect() {
        this.filePortalsService.connect(this.domain || 'test');
    }
}
