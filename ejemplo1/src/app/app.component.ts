import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Ejemplo1'
  playerActive: number = 1;
  bombIndex!: number; // se define en init
  cells: { id: number; value: string; hidden: boolean; color?: string }[] = [];
  footerMessage: string = '';

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    // Crear celdas (ejemplo con 7 como en tu script original)
    this.cells = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      value: '',
      hidden: true,
    }));

    this.hideBomb();
    this.footerMessage = `Turno de jugador ${this.playerActive}`;
  }

  hideBomb(): void {
    this.bombIndex = Math.floor(Math.random() * this.cells.length);
  }

  flipCell(cellIndex: number): void {
    const cell = this.cells[cellIndex];

    if (!cell.hidden) return; // si ya fue volteada, no hacer nada

    cell.hidden = false;

    if (cellIndex === this.bombIndex) {
      cell.value = '💣';
      cell.color = '#f00';
      setTimeout(() => this.finishGame(), 100);
    } else {
      cell.value = '🚩';
      cell.color = '#2a9d8f';
    }

    this.changeTurn();
  }

  changeTurn(): void {
    this.playerActive = this.playerActive === 1 ? 2 : 1;
    this.footerMessage = `Turno de jugador ${this.playerActive}`;
  }

  finishGame(): void {
    alert(`Jugador ${this.playerActive} ha Ganado`);
  }
}