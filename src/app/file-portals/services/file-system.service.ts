import { Injectable } from '@angular/core';
import { IFile } from '../types/file.type';
import { FilePortal, WebReader, WebWriter } from 'file-portals';
import { Subject } from 'rxjs';
import { ITransfer } from '../interfaces/transfer.interface';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
    
    private reader = new WebReader();
    private writer = new WebWriter();

    public on = {
        download: new Subject<any>()
    }

    constructor() { }

    public async download(portal: FilePortal, file: IFile) {
        // Create a writable
        const writable = await this.writer.create({ name: file.name, size: file.size });
        // Create a download
        const download: ITransfer = { name: file.name, size: file.size, started: Date.now(), ended: undefined,  transferred: 0 };
        // Emit download
        this.on.download.next(download);
        // Define chunk size of each part
        const size = 262144;
        // Calculate number of parts required to download
        const parts = Math.ceil(file.size / size);
        // Create an array to generate promises
        const promises = Array.from({ length: parts }, (value, index) => {
            // Set start of chunk
            const start = size * index;
            // Set end of chunk
            let end = start + size;
            // Check end is not larger than file size
            if (end > file.size) {
                end = size;
            }
            // Return a promise reading from portal
            return new Promise<void>(async (resolve) => {
                // Read from portal
                const blob = await portal.read(file.uuid, { start, end });
                // Write received blob to writable
                await this.writer.write(writable, blob, start);
                // Sum size of blob to download generated
                download.transferred += blob.size;
                // Resolve promise
                resolve();
            });
        });
        // Wait until all promises have been resolved
        await Promise.all(promises);
        // Update ended time of download
        download.ended = Date.now() - download.started;
        console.log('Ended in: ', download.ended / 1000);
        // Close writable, we finished download
        await this.writer.close(writable);
    }
}
