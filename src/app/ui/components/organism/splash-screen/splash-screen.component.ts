import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit {

    ngOnInit(): void {
        window.onload = async () => { //triger when every thing is load (files, assets, components' resolver, etc)
        
            await new Promise((resolve) => setTimeout(resolve, 500));
            const splashElement = document.querySelector(".splash-screen-container") as HTMLElement;

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
