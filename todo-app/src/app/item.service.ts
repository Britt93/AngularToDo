import { Injectable } from '@angular/core';
import { Item } from './item';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) {

   }


  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items");
  }


  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
  }

  getItemsOfList(listId: number) : Observable<Item[]> {
    let params = new HttpParams();
    params=params.set('listId', listId);
    params=params.set('_sort', 'order');
    return this.httpClient.get<Item[]>("http://localhost:3000/items", {params: params});
  }

  postItem(item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Item>("http://localhost:3000/items", item, { headers: headers });
  }

  putItem(id: number, item: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  
    return this.httpClient.put<Item>("http://localhost:3000/items/" + id, item, {headers: headers});
  }

  deleteItem(id: number): Observable<Item> {
    return this.httpClient.delete<Item>('http://localhost:3000/items/' + id);
  }



}
