import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl: string ='http://localhost:8000/api/'

  constructor(public http: HttpClient) {  }

  httpHeaders: any ={
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }


    public createRecipe(form): Observable <any>{
      this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('userToken');
      return this.http.post(this.apiUrl + 'postRecipe', form, this.httpHeaders);
    }


    public showRecipe(recipe_id): Observable<any>{
      return this.http.get(this.apiUrl + 'getRecipe/' + recipe_id);
    }

    // lista as receitas de um desafio específico
    public listRecipesChallenge(challenge_id): Observable <any>{
      return this.http.get(this.apiUrl + 'listRecipesOfChallenge/' + challenge_id);
    }

      // lista as receitas de um usuário específico
    public listRecipesUser(user_id): Observable <any>{
      return this.http.get(this.apiUrl + 'listRecipesOfUser/' + user_id);
    }

      // lista as receitas na home
    public listRecipesHome(): Observable <any>{
      return this.http.get(this.apiUrl + 'listRecipes');
    }

    // curtir uma receita
    public like(recipe_id): Observable <any> {
        this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('userToken');
        return this.http.post(this.apiUrl + 'likeRecipe/' + recipe_id, null, this.httpHeaders);
    }

    // verificar se curtiu
    public verifyLike(recipe_id): Observable <any> {
        this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('userToken');
        return this.http.get(this.apiUrl + 'hasLiked/' + recipe_id, this.httpHeaders);
    }


    public updateRecipe(recipe_id, form): Observable<any>{
      this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('userToken');
      return this.http.put(this.apiUrl + 'updateRecipe/' + recipe_id, form, this.httpHeaders);
    }

    public deleteRecipe(recipe_id): Observable<any>{
      this.httpHeaders.headers['Authorization'] = "Bearer " + localStorage.getItem('userToken');
      return this.http.delete(this.apiUrl + 'deleteRecipe/' + recipe_id, this.httpHeaders);
    }

}
