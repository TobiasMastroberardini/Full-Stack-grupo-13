import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-previus-and-next',
  standalone: true,
  imports: [],
  templateUrl: './previus-and-next.component.html',
  styleUrl: './previus-and-next.component.scss'
})
export class PreviusAndNextComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}