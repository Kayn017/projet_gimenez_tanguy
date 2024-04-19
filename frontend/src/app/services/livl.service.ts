import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

export type LivlItem = { id: number; name: string; img: string; price: number; description: string; category: string; };

@Injectable({
  providedIn: 'root'
})
export class LivlService {

  constructor(private httpClient: HttpClient) { }

  getLidlItems(): Observable<LivlItem[]> {
    return this.httpClient.get<LivlItem[]>(environment.apiURL + '/products');
  }
}
