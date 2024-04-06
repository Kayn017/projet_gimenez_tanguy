import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  public search: string = '';

  @Output()
  public searchChange: EventEmitter<string> = new EventEmitter<string>();

  public formSearch = new FormGroup({
    search: new FormControl('')
  });

  constructor() {}

  ngOnInit() {
    this.formSearch.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      if(typeof value.search === 'string') {
        this.searchItems(value.search);
      }
    });
  }

  searchItems(value: string) {
    this.searchChange.emit(value);
  }
}
