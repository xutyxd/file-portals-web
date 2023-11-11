import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { FilePortal } from 'file-portals';
import { FileSystemService } from '../../services/file-system.service';
import { IFile } from '../../types/file.type';

@Component({
  selector: 'app-file-portals-files',
  standalone: true,
  imports: [CommonModule, MatListModule, MatMenuModule, MatIconModule],
  templateUrl: './file-portals-files.component.html',
  styleUrl: './file-portals-files.component.scss'
})
export class FilePortalsFilesComponent {

    @Input() files: IFile[] = [];
    @Input() portal!: FilePortal;

    constructor(private fileSystemService: FileSystemService) { }

    public download(file: IFile) {
        this.fileSystemService.download(this.portal, file);
    }
}
