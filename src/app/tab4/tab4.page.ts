import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page  {
  count = 1025;
  pokemons: any[] = [];
  searchTerm: string = '';

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {

      for (let x = 1; x <= this.count; x++) {
        this.pokeApiService.getPokemonById(x).subscribe((value) => {
          this.pokemons.push(value)
          this.pokemons.sort((a, b) => a.id - b.id);
        });
      }

      console.log(this.pokemons);
  }

  onSearchChange(event:CustomEvent) {
    this.searchTerm = event.detail.value ? event.detail.value.toLowerCase() : '';
  }

  getFilteredPokemons() {
    return this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm)
    );
  }



}
