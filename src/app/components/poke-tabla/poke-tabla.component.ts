import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-poke-tabla',
  templateUrl: './poke-tabla.component.html',
  styleUrls: ['./poke-tabla.component.scss'],
})
export class PokeTablaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  getPokemons() {
    let pokemonData;

    for (let i = 1; i <= 898; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        (res) => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name,
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.changeDetectorRefs.detectChanges();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  //TODO: Filtro para el paginador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //TODO: Obtiene elemento seleccionado en la tabla
  getRow(row: any) {
    this.router.navigateByUrl(`/pokeDetalle/${row.position}`);
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
