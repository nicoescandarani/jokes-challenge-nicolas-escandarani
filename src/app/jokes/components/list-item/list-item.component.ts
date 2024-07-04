import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CopyJoke, Joke } from 'src/app/jokes/interfaces/joke';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() joke: Joke = {} as Joke;
  @Input() likedJoke: boolean = false;
  @Input() userJoke: boolean = false;

  @Output() copyJoke: EventEmitter<CopyJoke> = new EventEmitter<CopyJoke>();
  @Output() likeJoke: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteJoke: EventEmitter<number> = new EventEmitter<number>();

  miniMenuOpened: boolean = false;

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.miniMenuOpened = false;
    }
  }

  openMiniMenu(): void {
    this.miniMenuOpened = !this.miniMenuOpened;
  }

  copyJokeEmit(setup: string, punchline: string): void {
    this.copyJoke.emit({setup, punchline});
  }

  likeJokeEmit(id: number): void {
    this.likeJoke.emit(id);
  }

  deleteJokeEmit(id: number): void {
    this.deleteJoke.emit(id);
  }
}
