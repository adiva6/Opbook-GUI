import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SidenavService {
    private isOpen = true;
    public isSidenavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isOpen);

    constructor() {
    }

    public toggle(): void {
        this.isOpen = !this.isOpen;
        this.isSidenavOpen.next(this.isOpen);
    }
}
