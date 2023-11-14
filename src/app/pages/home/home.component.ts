import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoComponent } from '../../components/foto/foto.component';
import { DetalleComponent } from '../../components/detalle/detalle.component';
import { TarjetaComponent } from '../../components/tarjeta/tarjeta.component';
import { Pokemon } from '../../../../interfaces/pokemon';
import { PokemonService } from '../../pokemon.service';
import { Resultado } from '../../../../interfaces/pokeApi';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FotoComponent, DetalleComponent, TarjetaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('tarjetas') TarjetasComponent!: ElementRef;
  constructor(private pokemon: PokemonService) {}

  listaPokemons: Resultado[] = [];
  pokemonSeleccionado: Pokemon | undefined;
  pagina: number = 1;
  cargando: boolean = false;
  aperturaDetails: boolean = false;

  ngOnInit(): void {
    this.cargarLista();
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  async cargarLista() {
    if (this.cargando) return;
    this.cargando = true;
    this.listaPokemons = [
      ...this.listaPokemons,
      ...(await this.pokemon.getByPage(this.pagina)),
    ];
    this.pagina++;
    this.cargando = false;
  }

  onScroll(e: any) {
    if (
      Math.round(
        this.TarjetasComponent.nativeElement.clientHeight +
          this.TarjetasComponent.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.cargarLista();
    }
  }

  tarjetaClickeada(e: Pokemon) {
    if (this.pokemonSeleccionado?.name === e.name)
      return (this.aperturaDetails = !this.aperturaDetails);
    return (this.pokemonSeleccionado = e);
  }
}
