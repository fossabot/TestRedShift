import { TodoItemNode } from './TodoItemNode';
export class TodoItemArray extends Array<TodoItemNode> {
  //https://blog.simontest.net/extend-array-with-typescript-965cc1134b3
  private constructor(items?: Array<TodoItemNode>) {
    super(...items);
  }
  static create(): TodoItemArray {
    return Object.create(TodoItemArray.prototype);
  }
  tolog(id:number):boolean{
    return id==39570;
  }
  public FindParent(id: number): TodoItemNode {
    if(this.tolog(id)){
      console.log('finding ');
    }
    
    for (let index = 0; index < this.length; index++) {
      const element = this[index];
      var ret = this.findRec(element, id);
      if (ret != null){
        if(this.tolog(id)){
          console.log('found in find parent!');
        }
        return ret;
      }
    }
    if(this.tolog(id)){
      console.log('not found in parent!');
    }
    return null;
  }
  private findRec(t: TodoItemNode, id: number): TodoItemNode {
    if (t == null)
      return null;
    if (t.id == id){
      if(this.tolog(id)){
        console.log('found in find rec direct!');
      }
      
      return t;
    }
    const lengthChilder = t.children.length;
    for (let index = 0; index < length; index++) {
      const element = t.children[index];
      console.log(`iterating child {element.id}`);
      const ret = this.findRec(element, id);
      if (ret != null){
        if(this.tolog(id)){
          console.log('found in find rec!');
        }
        
        return ret;
      }
    }
    if(this.tolog(id)){
      console.log('not found in find rec!');
    }
    
    return null;
  }
}
