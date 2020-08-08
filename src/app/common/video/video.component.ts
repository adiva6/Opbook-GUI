import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';

@Component({
    template: '<youtube-player [videoId]="videoId" (ready)="playerReady.emit(readyMessage)"></youtube-player>',
    selector: 'app-video'
})
export class VideoComponent implements OnInit {
    @Input() videoId: string;
    @ViewChild('youtube-player') player: YouTubePlayer;
    @Output() playerReady: EventEmitter<string> = new EventEmitter<string>();
    public readyMessage = 'Ready';

    ngOnInit(): void {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }

    public seek(seconds: number): void {
        this.player.seekTo(seconds, true);
    }

    public getDuration(): number {
        return this.player?.getDuration();
    }
}
