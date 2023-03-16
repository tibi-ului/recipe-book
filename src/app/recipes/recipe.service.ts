import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is a simply a test',
  //     'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/4:6/w_3087,h_4631,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Frenh Fries', 20)
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Test Recipe',
  //     'This is a another simply a test',
  //     'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/4:6/w_3087,h_4631,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
