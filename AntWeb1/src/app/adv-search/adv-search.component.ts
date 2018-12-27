import { Component, OnInit } from '@angular/core';
import { AdvfindService } from '../advfind.service';
import { Observable } from 'rxjs';
import { Topic } from '../topic';
import { FoundResultsService } from '../found-results.service';
import { FormControl } from '@angular/forms';
import { FindBetweenResult } from '../classes/interval';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { Specialization } from '../Specialization';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  id:number;
  static FromSpec(s:Specialization):TodoItemNode{
    var t= new TodoItemNode();
    t.item =s.name;
    t.id= s.id;
    t.children=new Array<TodoItemNode>();
    return t;
  }
}
export class TodoItemArray extends Array<TodoItemNode>{

  //https://blog.simontest.net/extend-array-with-typescript-965cc1134b3
  private constructor(items?: Array<TodoItemNode>) {

    super(...items);
  }
  static create(): TodoItemArray {
    return Object.create(TodoItemArray.prototype);
  }
  public FindParent(id:number): TodoItemNode  {
      for (let index = 0; index < this.length; index++) {
        const element = this[index];
        var ret=this.findRec(element,id);
        if(ret != null)
          return ret;        
        
      }
      return null;
  }
  private findRec(t:TodoItemNode,id:number):TodoItemNode{
    if(t == null)
      return null;
    if(t.id == id)
      return t;
    const lengthChilder=t.children.length;
    for (let index = 0; index < length; index++) {
      const element = t.children[index];
      const ret= this.findRec(element,id);
      if(ret != null)
        return ret;
    }

    return null;
  }
}
/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private adv: AdvfindService) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.adv.getSpecializations().subscribe(it=>{
      var newArr = it.slice();
      console.log(`number received : ${newArr.length}`);
      const data= TodoItemArray.create();
     
      it.forEach((spec)=>{
        if(spec.idParent == null){
          data.push(TodoItemNode.FromSpec(spec));
          const index = newArr.indexOf(spec, 0);
          newArr.splice(index,1);
        }
      })
      console.log(`after removing null : ${newArr.length}`);
      while(newArr.length>0){
        console.log(`number elements : ${newArr.length}`);
        it.forEach((spec)=>{
          var item = data.FindParent(spec.idParent);

          if(item!= null){
            item.children.push(TodoItemNode.FromSpec(spec));  
            const index = newArr.indexOf(spec, 0);
            newArr.splice(index,1);
          }
        })
        
      }
      this.dataChange.next(data);
    });

    // Notify the change.
    
  }

  
 
}




@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.css'],
  providers: [ChecklistDatabase]
})
export class AdvSearchComponent implements OnInit {

 /** Map from flat node to nested node. This helps us finding the nested node to be modified */
 flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

 /** Map from nested node to flattened node. This helps us to keep the same object for selection */
 nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

 /** A selected parent node to be inserted */
 selectedParent: TodoItemFlatNode | null = null;

 /** The new item's name */
 newItemName = '';

 treeControl: FlatTreeControl<TodoItemFlatNode>;

 treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

 dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

 /** The selection for checklist */
 checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);


  topics:Topic[];
  public topicSearch = new FormControl();
  constructor(private database: ChecklistDatabase ,private adv: AdvfindService, private fs: FoundResultsService) { 
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

      }


      getLevel = (node: TodoItemFlatNode) => node.level;

      isExpandable = (node: TodoItemFlatNode) => node.expandable;
    
      getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
    
      hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
    
      hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
    
      /**
       * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
       */
      transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item
            ? existingNode
            : new TodoItemFlatNode();
        flatNode.item = node.item;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
      }
    
      /** Whether all the descendants of the node are selected. */
      descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
      }
    
      /** Whether part of the descendants are selected */
      descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
      }
    
      /** Toggle the to-do item selection. Select/deselect all the descendants node */
      todoItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
          ? this.checklistSelection.select(...descendants)
          : this.checklistSelection.deselect(...descendants);
    
        // Force update for the parent
        descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
      }
    
      /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
      todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
      }
    
      /* Checks all the parents when a leaf node is selected/unselected */
      checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
          this.checkRootNodeSelection(parent);
          parent = this.getParentNode(parent);
        }
      }
    
      /** Check root node checked state and change it accordingly */
      checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
          this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
          this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
          this.checklistSelection.select(node);
        }
      }
    
      /* Get the parent node of a node */
      getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);
    
        if (currentLevel < 1) {
          return null;
        }
    
        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    
        for (let i = startIndex; i >= 0; i--) {
          const currentNode = this.treeControl.dataNodes[i];
    
          if (this.getLevel(currentNode) < currentLevel) {
            return currentNode;
          }
        }
        return null;
      }
    

  ngOnInit() {
    this.adv.getTopics().subscribe(it=>{
      this.topics = it;    
    });
  }
  public displayFnTopic(c?: Topic): string | undefined {
    return c ?  c.name : undefined;
  }
  public topicSelected(t?:Topic){
    var fArr=[];
    var f=new FindBetweenResult();
    f.id=0;
    f.name="Loading data ... please wait";
    fArr.push(f);
    this.fs.NextRest(fArr);
    this.adv.FindAdvanced(t.id).subscribe(it=>{
      this.fs.NextRest(it);
    });
    //this.fs.NextRest
  }
}
