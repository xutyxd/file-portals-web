import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStorageService } from '../../shared/providers/user-storage.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SettingsNewUserComponent } from 'src/app/settings/components/settings-new-user/settings-new-user.component';

export const configuredGuard: CanActivateFn = async (route, state) => {

    const userStorageService = inject(UserStorageService);
    const dialogService = inject(DialogService);

    const logged = userStorageService.user.logged();

    if (!logged) {
        await dialogService.fullScreen(SettingsNewUserComponent);
    }
    
    return true;
};
