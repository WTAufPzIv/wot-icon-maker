import { NavigationGuard } from 'vue-router';
export const scrollToTop: NavigationGuard = function ():void {
    if(document.querySelector('.main-panel')) {
        (document.querySelector('.main-panel') as Element).scrollTop = 0;
    }
}