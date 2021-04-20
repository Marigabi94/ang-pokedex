import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-poke-detalle',
  templateUrl: './poke-detalle.component.html',
  styleUrls: ['./poke-detalle.component.scss'],
})
export class PokeDetalleComponent implements OnInit {
  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];
  constructor(
    private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.activatedRouter.params.subscribe((params) => {
      this.getPokemon(params['id']);
    });
  }
  getPokemon(id: any) {
    this.pokemonService.getPokemons(id).subscribe(
      (res) => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {}
}
