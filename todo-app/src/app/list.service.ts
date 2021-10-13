import { Injectable } from '@angular/core';
import { List } from './list'

@Injectable({
  providedIn: 'root'
})
export class ListService {
//maak lege array van class List / declare List-array
  private lists: List[] = [];

  constructor() { 
    //maak obj "list1" van class List
    let list1: List = {
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
    this.lists.push(list3);
  }

  //functie getLists krijgt een lijst terug van class List
  getLists(): List[] {
    return this.lists;
  }

  getListById(id: number) : List | null {
    return this.lists.find(l=>l.id === id) ?? null;
  }



}
