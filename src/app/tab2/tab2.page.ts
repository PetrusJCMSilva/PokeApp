import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  btnBusca = false;
  btnBatalha = true;
  idPokemon: any = '';
  pokemon: any = {
    name: '',
    abilities: '',
    height: '',
    weight: '',
    imageURL: '',
  };
  oponente: any;
  resultado: string = "Um Pokémon selvagem apareceu.";
  cor: string = '';

  constructor(private pokeApiService: PokeApiService, public photoService: PhotoService,private pokemonService: PokemonService) {}
  addPhotoToGallery() {
    this.photoService.addNewGallery();
  }

  ionViewDidEnter() {
   
    this.buscarPokemon();
    
  }

  buscarPokemon(){
  this.pokemon.abilities = Math.floor(Math.random() * 10);
  this.idPokemon =  Math.floor(Math.random() * 1000);
  this.pokeApiService.getPokemonById(this.idPokemon).subscribe((value)  =>{
    this.pokemon.weight = JSON.parse(JSON.stringify(value))["weight"];
    this.pokemon.height = JSON.parse(JSON.stringify(value))["height"];
    this.pokemon.name = JSON.parse(JSON.stringify(value))["name"];
  });
  this.pokemon.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+this.idPokemon+".svg";
  this.btnBatalha = true;
  this.btnBusca = false;
  this.cor = '';
  this.resultado = "Um Pokémon selvagem apareceu."
  }
  batalhaPokemon(){
    this.oponente = this.pokemonService.getPokemon();

    if (this.oponente == null){
       this.resultado = "Busque um Pokémon primeiro.";
       this.cor = "default";
    
    }else if (this.pokemon.abilities == this.oponente.abilities){
       this.resultado = "Empate";
       this.oponente.empates++;
       this.cor = "default";
       this.pokemonService.addPokemon(this.oponente);

    }else if (this.pokemon.abilities > this.oponente.abilities){
       this.resultado = "Venceu";
       this.oponente.vitorias++;
       this.cor = "success";
       this.pokemonService.addPokemon(this.oponente);
    }else{
       this.resultado = "Perdeu";
       this.oponente.derrotas++
       this.cor = "danger";
       this.pokemonService.addPokemon(this.oponente);
    }
  this.btnBusca = true;
  this.btnBatalha = false;
  }
}


