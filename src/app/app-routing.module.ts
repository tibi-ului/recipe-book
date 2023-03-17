import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shoping-list.module').then(module => module.ShoppingListModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
