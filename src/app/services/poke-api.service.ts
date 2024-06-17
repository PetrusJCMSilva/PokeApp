// pokeapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})

export class PokeApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private httpClient: HttpClient) {}

  getPokemonById(id: number) {
    return this.httpClient.get(`${this.apiUrl}pokemon/${id}`);
  }

  getPokemonByUrl(url: string){
    return this.httpClient.get(url);
  }
  getAllPokemon(){
    return this.httpClient.get(`${this.apiUrl}pokemon`);
  }

}

