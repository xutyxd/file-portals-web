import { Component } from '@angular/core';
import { FilePortalsService } from '../../services/file-portals.service';

@Component({
  selector: 'app-file-portal-connect',
  templateUrl: './file-portal-connect.component.html',
  styleUrls: ['./file-portal-connect.component.scss']
})
export class FilePortalConnectComponent {

    public domain: string = '';

    constructor(private filePortalsService: FilePortalsService) { }

    public connect() {
        console.log('Domain: ', this.domain);

        this.filePortalsService.connect(this.domain);
    }
}
