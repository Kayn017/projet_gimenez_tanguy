import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { LivlItem, LivlService } from '../services/livl.service';
import { CommonModule } from '@angular/common';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'list',
  standalone: true,
  imports: [
    CommonModule,
    ItemComponent,
    TuiScrollbarModule,
    SearchBarComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: []
})
export class ListComponent {
  items: LivlItem[] = [];

  public search: string = '';

  constructor(private livlService: LivlService) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(filter?: string) {
    this.livlService.getLidlItems(filter).subscribe((result) => {
      this.items = result;
    });
  }
}

