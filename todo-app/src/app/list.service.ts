import { Injectable } from '@angular/core';
import { List } from './list'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  //functie getLists krijgt een lijst terug van class List
  getLists(): List[] {
    //maak lege array van class List / declare List-array
    let lists: List[] = [];

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

    //zet obj list1 in de array
    lists.push(list1);
    lists.push(list2);
    lists.push(list3);


    return lists;
  }



}
