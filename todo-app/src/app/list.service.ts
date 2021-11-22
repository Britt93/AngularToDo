import { Injectable } from '@angular/core';
import { List } from './list'

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
//maak lege array van class List / declare List-array
  private lists: List[] = [];

  constructor(private httpClient: HttpClient) { 
    //maak obj "list1" van class List
    /*let list1: List = {
      id: 1,
      name: "Taak Angular",
      category: "school"
    };

    let list2: List = {
      id: 2,
      name: "Grote kuis",
      category: "cleaning"
    };

    let list3: List = {
      id: 3,
      name: "Taak MD-AR",
      category: "school"
    };
    //voeg obj "list1" van class List toe aan de array "lists"
    this.lists.push(list1);
    this.lists.push(list2);
    this.lists.push(list3);*/
  }

  //functie getLists krijgt een lijst terug van class List
  getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>("http://localhost:3000/lists");
  }

  getListById(id: number) : Observable<List>{
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id);
  }



}
