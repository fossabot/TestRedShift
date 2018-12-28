import { TodoItemNode } from './TodoItemNode';
export class TodoItemArray extends Array<TodoItemNode> {
  //https://blog.simontest.net/extend-array-with-typescript-965cc1134b3
  private constructor(items?: Array<TodoItemNode>) {
    super(...items);
  }
  static create(): TodoItemArray {
    return Object.create(TodoItemArray.prototype);
  }
  public FindParent(id: number): TodoItemNode {
    for (let index = 0; index < this.length; index++) {
      const element = this[index];
      var ret = this.findRec(element, id);
      if (ret != null)
        return ret;
    }
    return null;
  }
  private findRec(t: TodoItemNode, id: number): TodoItemNode {
    if (t == null)
      return null;
    if (t.id == id)
      return t;
    const lengthChilder = t.children.length;
    for (let index = 0; index < length; index++) {
      const element = t.children[index];
      const ret = this.findRec(element, id);
      if (ret != null)
        return ret;
    }
    return null;
  }
}
