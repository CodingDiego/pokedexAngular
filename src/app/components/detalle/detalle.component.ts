import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../../api/interfaces/pokemon';
import { PokemonService } from '../../../../api/src/pokemon.service';
import { outputAst } from '@angular/compiler';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss',
})
export class DetalleComponent implements OnChanges {
  @Input() pokemon?: Pokemon;
  @Input() abierto: boolean = false;
  @Output() cambiarEstadoApertura = new EventEmitter();
  descripcion: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(cambio: SimpleChanges) {
    if (cambio['pokemon'] && !cambio['pokemon'].isFirstChange()) {
      this.pokemonService
        .getDescripcion(cambio['pokemon'].currentValue.id)
        .then((res) => {
          this.descripcion = res;
        });
    }
  }

  cambiarAbierto() {
    if (this.pokemon) this.cambiarEstadoApertura.emit();
  }
}
