import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
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

  constructor(private shopingListService: ShoppingListService, private loggingService: LoggingService) {}
 

  ngOnInit() { 
    this.ingredients = this.shopingListService.getIngredients();
    this.igredientChangeSubscription = this.shopingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
      this.loggingService.printLog('hello from shoppingListComponent ngOnInit');

  }

  onEditItem(index: number) {
    this.shopingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igredientChangeSubscription.unsubscribe();
  }
}
