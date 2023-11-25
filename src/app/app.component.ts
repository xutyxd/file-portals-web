import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'File Portals';

    ngOnInit(): void {
        window.onload = async () => { //triger when every thing is load (files, assets, components' resolver, etc)
        
            await new Promise((resolve) => setTimeout(resolve, 500));
            const splashElement = document.querySelector(".splash-screen-container") as HTMLElement;
            console.log('SplashElement: ', splashElement);
            if (!splashElement) {
                return;
            }
            // All good so add clas "splashScreenFade" to hide the splash screen slowly 
            splashElement.classList.add("fade");
            splashElement.addEventListener('transitionend', (e) => {
                splashElement.style.display = 'none'
            });
        }
    }
}
