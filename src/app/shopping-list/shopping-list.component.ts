import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igredientChangeSubscription: Subscription;

  constructor(private shopingListService: ShoppingListService) {}
 

  ngOnInit() { 
    this.ingredients = this.shopingListService.getIngredients();
    this.igredientChangeSubscription = this.shopingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );


  }

  onEditItem(index: number) {
    this.shopingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igredientChangeSubscription.unsubscribe();
  }
}
