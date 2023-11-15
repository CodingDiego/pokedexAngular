import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../../api/src/pokemon.service';
import { Pokemon, Species } from '../../../../api/interfaces/pokemon';
import { Resultado } from '../../../../api/interfaces/pokeApi';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.scss',
})
export class TarjetaComponent implements OnChanges {
  constructor(private pokemon: PokemonService) {}
  ngOnChanges(): void {
    this.extraerDatos();
  }

  @Input() fullData: Pokemon | undefined;
  @Input() data: Resultado | undefined;
  @Input() seleccionado: boolean = false;
  @Output() clicked = new EventEmitter<Pokemon>();
  id: string = '0';

  selected() {
    if (this.fullData) this.clicked.next(this.fullData);
  }

  extraerDatos() {
    if (this.data && !this.fullData) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      this.pokemon.getById(this.id).then((res) => (this.fullData = res));
      return;
    }
    if (this.fullData) {
      this.id = this.fullData.species.url.substring(
        42,
        this.fullData.species.url.length - 1
      );
      this.data = { name: this.fullData.species.name, url: '' };
    }
  }
}
