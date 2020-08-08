import {Component, Input, OnInit} from '@angular/core';

@Component({
    template: '<youtube-player [videoId]="videoId"></youtube-player>',
    selector: 'app-video'
})
export class VideoComponent implements OnInit {
    @Input() videoId: string;

    ngOnInit(): void {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }
}
