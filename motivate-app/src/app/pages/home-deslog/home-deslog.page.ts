import { Component, OnInit } from '@angular/core';
import { ChallengeServiceService } from '../../services/challenge-service.service';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-deslog',
  templateUrl: './home-deslog.page.html',
  styleUrls: ['./home-deslog.page.scss'],
})
export class HomeDeslogPage implements OnInit {

    usuarioId;
    token = localStorage.getItem("userToken");
    challenge;
    challengeId;
    recipes;
    usuario:Object;
    recipe;
    likeMode;
    check;

constructor(private router: Router, public challengeServiceService:ChallengeServiceService,
  public recipeService: RecipeService, public authService: AuthService) {
  this.challengeId = this.router.getCurrentNavigation().extras;

  this.details();
}


 details() {
  this.authService.showMyDetails().subscribe(
      (res) => {
          console.log(res);

          this.usuario = res[0];
          this.usuarioId = res[0].id;
           console.log("Bem vindo(a),", res[0].name);
      },
      (err) =>{
        console.log(err);
      }
  );

}

  getChallenge(id){
     this.challengeServiceService.getChallenge(id).subscribe(
      (res)=>{
        console.log(res);
        this.challenge = res.challenge;

      },
      (err)=>{
        console.log(err);
      }
    );
  }

  listRecipes(){
    this.recipeService.listRecipesHome().subscribe(
      (res)=>{
        console.log(res);
        this.recipes=res.recipeList;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

   GoToRecipe(recipe_id) {
    this.router.navigate(['/recipe'], recipe_id);
  }

  GoToRegister(){
    this.router.navigate(['/cadastro-usuario']);
  }

  GoToLogin(){
    this.router.navigate(['/login']);
  }

  GoToProfile(user_id) {
    if(this.usuarioId!=user_id){
        this.router.navigate(['/profile-other', {userId:user_id}]);
    }
    console.log("Acesse seu perfil pela tabBar.");
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listRecipes();

  }

}
