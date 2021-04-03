import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { fromEvent, Observable, of } from 'rxjs';

import { Link } from '../../shared/models/link/link';
import { Img } from '../../shared/models/img/img';
import { Btn } from '../../shared/models/btn/btn';
import { Letters } from '../../shared/enums/letters.enum';

@Component({
    selector: 'h-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
    showBtns = false;
    isBrowser = false;
    keyFtSz = 'ftSz';
    keyFilter = 'filter';
    greyVal = 'grayscale(1)';
    htmlEl: HTMLElement|null = null;
    logoImgObservable: Observable<string> = of("./assets/imgs/hotequil.webp");
    showLogoImg = false;
    name = 'João Paulo Hotequil';
    img: Img = { src: './assets/imgs/logo.svg', alt: 'João Paulo Hotequil\'s img' };

    links: Link[] = [
        {
            text: 'Curriculum',
            href: './assets/docs/curriculum.pdf',
            target: '_blank'
        },
        {
            text: 'Email',
            href: 'mailto:hotequil@protonmail.com',
            target: '_self',
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/joao-paulo-hotequil',
            target: '_blank'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/hotequil',
            target: '_blank'
        },
        {
            text: 'LBRY',
            href: 'https://lbry.tv/@hotequil',
            target: '_blank'
        },
        {
            text: 'Twitter',
            href: 'https://twitter.com/joaohotequil',
            target: '_blank',
        },
    ];

    btns: Btn[] = [
        {
            txt: 'A+',
            ariaLabel: 'Increase font size',
            tooltip: 'Ctrl + Alt + B',
            click: () => this.fontBigger(),
            active: () => false
        },
        {
            txt: 'A-',
            ariaLabel: 'Decrease font size',
            tooltip: 'Ctrl + Alt + S',
            click: () => this.fontSmaller(),
            active: () => false
        },
        {
            txt: 'High contrast',
            ariaLabel: 'Alto contraste',
            tooltip: 'Ctrl + Alt + C',
            click: () => this.toggleFilter(),
            active: () => this.greyVal === this.getFilterOnLocalStorage
        }
    ];

    constructor(@Inject(PLATFORM_ID) platformId: string, private renderer: Renderer2) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void{
        if(this.isBrowser){
            this.showBtns = true;
            this.htmlEl = document.querySelector('html');

            this.setFtSz(Number(window.localStorage.getItem(this.keyFtSz)));
            this.setFilter(this.getFilterOnLocalStorage);

            fromEvent(window, 'keydown').subscribe((evt: any) => {
                if(evt && evt.ctrlKey && evt.altKey){
                    switch(String.fromCharCode(evt.which).toLowerCase()){
                        case Letters.B:
                            this.fontBigger();
                            break;
                        case Letters.S:
                            this.fontSmaller();
                            break;
                        case Letters.C:
                            this.toggleFilter();
                            break;
                    }
                }
            })
        }

        setTimeout(() => this.showLogoImg = true, 1000);
    }

    private changeFontSize(val: number): void{
        const ftSz = Number(getComputedStyle(this.htmlEl as HTMLElement).fontSize.replace(/\D/g, ''));
        const finalVal = ftSz + val;

        if(finalVal <= 20 && finalVal >= 12){
            this.setFtSz(finalVal);
            window.localStorage.setItem(this.keyFtSz, String(finalVal));
        }
    }

    private toggleFilter(): void{
        let filter = this.greyVal;

        if(this.getFilterOnLocalStorage === filter) filter = '';

        setTimeout(() => {
            this.setFilter(filter);
            window.localStorage.setItem(this.keyFilter, filter);
        }, 100);
    }

    private get getFilterOnLocalStorage(): string{
        return window.localStorage.getItem(this.keyFilter) as string;
    }

    private setFilter(filter: string): void{
        if (this.isBrowser) this.renderer.setStyle(this.htmlEl, 'filter', filter);
    }

    private setFtSz(val: number): void{
        if (this.isBrowser && val) {
            this.renderer.setStyle(this.htmlEl, 'font-size', `${val}px`);
        }
    }

    private fontBigger(): void{
        this.changeFontSize(1);
    }

    private fontSmaller(): void{
        this.changeFontSize(-1);
    }
}
