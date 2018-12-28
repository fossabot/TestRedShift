import { Specialization } from '../Specialization';
import { Topic } from '../topic';
/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  hdNumber: number;
  id: number;
  static FromSpec(s: Specialization): TodoItemNode {
    var t = new TodoItemNode();
    t.item = s.name;
    t.id = s.id;
    t.children = new Array<TodoItemNode>();
    t.hdNumber = s.hdNumber;
    return t;
  }
  static FromTopic(s: Topic): TodoItemNode {
    var t = new TodoItemNode();
    t.item = s.name;
    t.id = s.id;
    t.children = new Array<TodoItemNode>();
    t.hdNumber = s.hdNumber;
    return t;
  }
}
