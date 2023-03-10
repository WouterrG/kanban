import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  boards?: Board[];
  sub?: Subscription;

  constructor(public boardService: BoardService) {}

  ngOnInit() {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe((boards) => (this.boards = boards));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.boards) {
      moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
      this.boardService.sortBoards(this.boards);
    }
  }
}
