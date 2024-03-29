import { AdvfindService } from "../advfind.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoItemNode } from "./TodoItemNode";
import { TodoItemArray } from "./TodoItemArray";
import { Specialization } from '../Specialization';
/**
 * The Json object for to-do list data.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  //get data(): TodoItemNode[] { return this.dataChange.value; }
  constructor(private adv: AdvfindService) {
    //this.initialize();
  }
  //TODO: user https://angular.io/guide/dynamic-component-loader
  initializeTopics() {
    this.adv.getTopics().subscribe(it => {
      console.log(`number received : ${it.length}`);
      const data = TodoItemArray.create();

      it.forEach(top => {
        data.push(TodoItemNode.FromTopic(top));
      });
      this.dataChange.next(data);
    });
  }
  initializeProfession(){
    this.adv.getProf().subscribe(it => {
      var data=this.interpretSpec(it);
      this.dataChange.next(data);
    });
  }
  initializeLiteraryMovements(){
    this.adv.getLitMove().subscribe(it => {
      var data=this.interpretSpec(it);
      this.dataChange.next(data);
    });
  }

  interpretSpec(it: Specialization[]): TodoItemArray{
    var newArr = it.slice();
    // console.log(`number received : ${newArr.length}`);
    const data = TodoItemArray.create();

    it.forEach(spec => {
      if (spec.idParent == null) {
        data.push(TodoItemNode.FromSpec(spec));
        const index = newArr.indexOf(spec, 0);
        newArr.splice(index, 1);
      }
    });
    console.log(`after removing null : ${newArr.length}`);
    while (newArr.length > 0) {
      var latestNumber= newArr.length;
      console.log(`number elements : ${latestNumber}`);
      it.forEach(spec => {
        if (spec.idParent != null) {
          var item = data.FindParent(spec.idParent);
          if (item != null) {
            var id = spec.id;
            if (item.children.filter(c => c.id == id).length == 0) {
              var newNode = TodoItemNode.FromSpec(spec);
              item.children.push(newNode);
              const index = newArr.findIndex(it => it.id == id);
              newArr.splice(index, 1);
            }
          }
        }
      });
      
      if(newArr.length == latestNumber){
        console.table(data);
        console.table(newArr);
        //window.alert('error loading parents');
        break;
      }
    }
    return data;

  }
  initializeSpecialization() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.adv.getSpecializations().subscribe(it => {
        var data=this.interpretSpec(it);
        this.dataChange.next(data);
    });
    // Notify the change.
  }
}
