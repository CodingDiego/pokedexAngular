import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foto.component.html',
  styleUrl: './foto.component.scss',
})
export class FotoComponent {
  @Input() src: string | undefined;
  @Input() alt: string | undefined;
}
