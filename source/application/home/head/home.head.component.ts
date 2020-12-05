import { Component } from '@angular/core';

import { ImageInterface } from '../../image/image.interface';
import { LinkInterface } from '../../link/link.interface';

@Component({
    selector: 'hotequil-home-head',
    templateUrl: './home.head.component.html',
    styleUrls: ['./home.head.component.scss']
})
export class HomeHeadComponent{
    name = 'Hotequil';
    title = 'Hello world';
    image: ImageInterface = { source: './assets/images/hotequil.png', alternative: 'Foto de João Paulo Hotequil' };
    links: LinkInterface[] = [
        {
            text: 'GitHub',
            location: 'https://github.com/hotequil',
            target: '_blank'
        },
        {
            text: 'LinkedIn',
            location: 'https://www.linkedin.com/in/jo%C3%A3o-paulo-hotequil-3044b4173',
            target: '_blank'
        },
        {
            text: 'LBRY',
            location: 'https://lbry.tv/@hotequil:7',
            target: '_blank'
        },
        {
            text: 'Twitter',
            location: 'https://twitter.com/joaohotequil',
            target: '_blank',
        },
    ];
    buttons: LinkInterface[] = [
        {
            text: 'Baixar currículo',
            location: './assets/documents/curriculum.odt',
            target: '_blank'
        },
        {
            text: 'Me envie um e-mail',
            location: 'mailto:hotequil@protonmail.com',
            target: '_self',
            filled: true
        }
    ];
}
