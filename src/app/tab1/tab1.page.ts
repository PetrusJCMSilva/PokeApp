import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  exibir: boolean = false;


  pokemon: any = {
    idPokemon: '',
    name: '',
    abilities: '',
    height: '',
    weight: '',
    imageURL: '',
  };

  pokemonEncontrado: any = {
    idPokemon: '',
    abilities: '',
    vitorias: 0,
    derrotas: 0,
    empates: 0,
  }

  teste: any;
  constructor(private pokeApiService: PokeApiService, private viaCEPService: ViaCEPService, private pokemonService: PokemonService){

  }



  buscarPokemon(){

    this.pokemon.abilities = Math.floor(Math.random() * 10);
    this.exibir = true;
    this.pokemon.idPokemon =  Math.floor(Math.random() * 1000);
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = JSON.parse(JSON.stringify(value))['uf'];
    });

    this.pokeApiService.getPokemonById(this.pokemon.idPokemon).subscribe((value)  =>{
      this.pokemon.weight = JSON.parse(JSON.stringify(value))["weight"];
      this.pokemon.height = JSON.parse(JSON.stringify(value))["height"];
      this.pokemon.name = JSON.parse(JSON.stringify(value))["name"];
    });
    this.pokemon.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+this.pokemon.idPokemon+".svg";

    this.pokemonEncontrado.idPokemon =  this.pokemon.idPokemon;
    this.pokemonEncontrado.abilities =  this.pokemon.abilities;
    this.pokemonService.addPokemon(this.pokemonEncontrado);
    console.log(this.pokemonEncontrado);
    console.log(this.pokemon);
    this.teste = this.pokemonService.getListPokemon();
    console.log(this.teste);


  }
}
