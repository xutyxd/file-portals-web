import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FilePortalsService } from '../../services/file-portals.service';

@Component({
  selector: 'app-file-portals-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-portals-portal.component.html',
  styleUrl: './file-portals-portal.component.scss'
})
export class FilePortalsPortalComponent implements OnInit {

    private domain?: string;

    constructor(private activatedRoute: ActivatedRoute,
                private filePortalsService: FilePortalsService) {
        console.log('ROuter: ', this.activatedRoute.snapshot);
        const { id } = this.activatedRoute.snapshot.params;
        this.domain = id;
        console.log('Portal to open: ', id);

        
    }

    public async ngOnInit(): Promise<void> {

        const { domain } = this;

        if (!domain) {
            console.log('Connection aborted, no domain!');
            return;
        }

        const connection = await this.filePortalsService.connect(domain);
        
        console.log('Connection: ', connection);
    }
}
