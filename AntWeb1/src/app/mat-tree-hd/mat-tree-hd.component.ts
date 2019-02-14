import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoItemFlatNode } from '../adv-search/TodoItemFlatNode';
import { TodoItemNode } from '../adv-search/TodoItemNode';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Topic } from '../topic';
import { FormControl } from '@angular/forms';
import { ChecklistDatabase } from '../adv-search/ChecklistDatabase';
import { AdvfindService } from '../advfind.service';
import { FoundResultsService } from '../found-results.service';
import { FindBetweenResult } from '../classes/interval';

@Component({
  selector: 'app-mat-tree-hd',
  templateUrl: './mat-tree-hd.component.html',
  styleUrls: ['./mat-tree-hd.component.css']
})
export class MatTreeHDComponent implements OnInit {
  private _name: string;
  @Output() 
  results = new EventEmitter<TodoItemFlatNode[]>();

  @Output() 
  startSearchOnMe= new EventEmitter();
  @Input() set name(value : string){
    this._name=value;
    switch(value.toLocaleLowerCase()){
      case "topics":
        this.database.initializeTopics();
        break;
      case "specialization":
        this.database.initializeSpecialization();
        break;
      case "literarymovements":
        this.database.initializeLiteraryMovements();
        break;
      case "profession":
        this.database.initializeProfession();
        break;
      default:
        console.log("do not understand "+value);
    }
    

  }
  get name():string{
    return this._name;
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
 flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

 /** Map from nested node to flattened node. This helps us to keep the same object for selection */
 nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

 /** A selected parent node to be inserted */
 selectedParent: TodoItemFlatNode | null = null;

 
 treeControl: FlatTreeControl<TodoItemFlatNode>;

 treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

 dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

 /** The selection for checklist */
 checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  database :  ChecklistDatabase;
  topics:Topic[];
  public topicSearch = new FormControl();
  constructor(private adv: AdvfindService, private fs: FoundResultsService) { 
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      
      this.database =new ChecklistDatabase(adv);
      this.database.dataChange.subscribe(data => {
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
        flatNode.id= node.id;
        flatNode.level = level;
        flatNode.expandable = (node.children.length>0);
        flatNode.hdNumber= node.hdNumber;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
      }
    
      /** Whether all the descendants of the node are selected. */
      descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        if(descendants.length == 0)
          return false;
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
        this.search();
      }
      search(){
        this.startSearchOnMe.emit();
          var ids=this.checklistSelection.selected;
          //window.alert(`${this.name} ${ids.length}`);
          this.results.emit(ids);

          // switch(this.name.toLowerCase()){
          //   case "topics":
          //     this.adv.FindAdvancedTopic(ids).subscribe(it=>{
          //       this.results.emit(it);
          //     });
          //     break;
          //   case "specialization":
          //     this.adv.FindAdvancedSpec(ids).subscribe(it=>{
          //       this.results.emit(it);
          //     });
          //     break;
          //   default:
          //     console.log("do not understand "+this.name);
          // }
          
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
    
      ngOnInit(): void {
    
      }

}
