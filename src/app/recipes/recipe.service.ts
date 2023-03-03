
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a simply a test',
      'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/4:6/w_3087,h_4631,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Frenh Fries', 20)
      ]
    ),
    new Recipe(
      'Another Test Recipe',
      'This is a another simply a test',
      'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/4:6/w_3087,h_4631,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    ),
  ];
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
