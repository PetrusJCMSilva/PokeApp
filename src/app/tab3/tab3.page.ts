import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  

  listaDireita: any[] = [];
  listaEsquerda: any[] = [];
  resultados!: any;
  cont = 0;

  constructor(private pokeApiService: PokeApiService, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.resultados = this.pokemonService.getListPokemon();
   
    for (let resultado of this.resultados){
      console.log(resultado);
      
      const pokemon =  {
        idPokemon: '',
        name: '',
        abilities: '',
        height: '',
        weight: '',
        imageURL: '',
        vitorias: '',
        derrotas: '',
        empates: ''
      };
      
      this.pokeApiService.getPokemonById(resultado.idPokemon).subscribe((value)  =>{
        pokemon.weight = JSON.parse(JSON.stringify(value))["weight"];
        pokemon.height = JSON.parse(JSON.stringify(value))["height"];
        pokemon.name = JSON.parse(JSON.stringify(value))["name"];
        pokemon.imageURL = JSON.parse(JSON.stringify(value))["sprites"]["front_default"];
      });
      pokemon.vitorias = resultado.vitorias;
      pokemon.derrotas = resultado.derrotas;
      pokemon.empates = resultado.empates;

      if(this.cont % 2 == 0){
        this.listaDireita.push(pokemon);
      }else{
        this.listaEsquerda.push(pokemon);
      }
      this.cont++;
    }
  }

}
