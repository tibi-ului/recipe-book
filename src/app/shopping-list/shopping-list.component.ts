import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private igredientChangeSubscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    // this.store.select('shoppingList').subscribe();   // putem subscrie manual  ( cel mai sigur ar fi sa facem noi unsubscribe ) daca nu putem folosi async pipe

    // this.ingredients = this.shopingListService.getIngredients();
    // this.igredientChangeSubscription =
    //   this.shopingListService.ingredientsChanged.subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    // );

    this.loggingService.printLog('hello from shoppingListComponent ngOnInit');
  }

  onEditItem(index: number) {
    // this.shopingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.igredientChangeSubscription.unsubscribe();
  }
}
