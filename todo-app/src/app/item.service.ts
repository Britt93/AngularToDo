import { Injectable } from '@angular/core';
import { Item } from './item';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
//maak lege array van class Item / declare Item-array
//private items: Item[] = [];
  constructor(private httpClient: HttpClient) {

//maak obj "item1" van class List
/*let item1: Item = {
  id: 1,
  text: "api implementeren",
  listId: 1
};

let item2: Item = {
  id: 2,
  text: "crud",
  listId: 1
};

let item3: Item = {
  id: 3,
  text: "modularity",
  listId: 1
};

let item4: Item = {
  id: 4,
  text: "afstoffen",
  listId: 2
};

let item5: Item = {
  id: 5,
  text: "stofzuigen",
  listId: 2
};

let item6: Item = {
  id: 6,
  text: "dwijlen",
  listId: 2
};

let item7: Item = {
  id: 7,
  text: "afwassen",
  listId: 2
};

let item8: Item = {
  id: 7,
  text: "strijken",
  listId: 2
};

let item9: Item = {
  id: 8,
  text: "nav naar AR",
  listId: 3
};

let item10: Item = {
  id: 9,
  text: "comm flutter - wikitude",
  listId: 3
};

let item11: Item = {
  id: 10,
  text: "models",
  listId: 3
};
//voeg obj "list1" van class List toe aan de array "lists"
this.items.push(item1);
this.items.push(item2);
this.items.push(item3);
this.items.push(item4);
this.items.push(item5);
this.items.push(item6);
this.items.push(item7);
this.items.push(item8);
this.items.push(item9);
this.items.push(item10);
this.items.push(item11);*/


   }

   /*getItems(): Item[] {
    return this.items;

  }*/
  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items");
  }

  /*getItemById(id: number) : Item | null {
    return this.items.find(i=>i.id === id) ?? null;
  }*/

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
  }

  getItemsOfList(listId: number) : Observable<Item[]> {
    let params = new HttpParams().set('listId', listId);
    return this.httpClient.get<Item[]>("http://localhost:3000/items", {params: params});
  }



}
