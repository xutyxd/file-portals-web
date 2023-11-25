import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-fp-title',
    standalone: true,
    imports: [ MatDividerModule ],
    templateUrl: './fp-title.component.html',
    styleUrl: './fp-title.component.scss'
})
export class FpTitleComponent {

    @Input({ required: true }) title: string = '';
}
