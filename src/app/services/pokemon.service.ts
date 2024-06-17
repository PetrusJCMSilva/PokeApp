import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: any[] = []; // Lista de Pokémon

  constructor() {}

  addPokemon(pokemon: any): void {

    const newPokemon = {
      idPokemon: pokemon.idPokemon,
      abilities: pokemon.abilities,
      vitorias: pokemon.vitorias,
      derrotas: pokemon.derrotas,
      empates: pokemon.empates
    };
    
    this.pokemons.push(newPokemon);
  }

  getPokemon(): any {
    return this.pokemons.pop();
  }

  getListPokemon(): any {
    return this.pokemons;
  }

}
