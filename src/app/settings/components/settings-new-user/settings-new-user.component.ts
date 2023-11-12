import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../services/settings.service';
import { UserStorageService } from 'src/app/shared/providers/user-storage.service';


@Component({
  selector: 'app-settings-new-user',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            MatInputModule,
            MatButtonModule],
  templateUrl: './settings-new-user.component.html',
  styleUrl: './settings-new-user.component.scss'
})
export class SettingsNewUserComponent {

    public userForm = new FormGroup({
        nickname: new FormControl('', [ Validators.required, Validators.minLength(3) ])
    });

    constructor(private dialogRef: MatDialogRef<SettingsNewUserComponent>,
                private userStorageService: UserStorageService) { }

    public save() {
        const { nickname } = this.userForm.getRawValue();

        if (!nickname) {
            return;
        }

        this.userStorageService.user.create(nickname);

        this.dialogRef.close();
    }
}
