import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoComponent } from '../../components/foto/foto.component';
import { DetalleComponent } from '../../components/detalle/detalle.component';
import { TarjetaComponent } from '../../components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FotoComponent, DetalleComponent, TarjetaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
