import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReservasService } from './../../../services/reservas.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listagem-reservas',
  templateUrl: './listagem-reservas.component.html',
  styleUrls: ['./listagem-reservas.component.css'],
})
export class ListagemReservasComponent implements OnInit {
  reservas = new MatTableDataSource<any>();
  displayedColumns: string[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  autoCompleteInput = new FormControl();
  opcoesCategorias: string[] = [];
  nomesCategorias: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private reservasService: ReservasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reservasService
      .ObterReservasPeloUsuarioId(this.usuarioId)
      .subscribe((resultado) => {
        resultado.forEach((reserva) => {
          this.opcoesCategorias.push(reserva.categoria.nome);
        });

        this.reservas.data = resultado;
        this.reservas.paginator = this.paginator;
        this.reservas.sort = this.sort;
      });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarCategorias(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['descricao', 'categoria', 'valor', 'data', 'acoes'];
  }

  FiltrarCategorias(nomeCategoria: string): string[] {
    if (nomeCategoria.trim().length >= 4) {
      this.reservasService
        .FiltrarReserva(nomeCategoria.toLowerCase())
        .subscribe((resultado) => {
          this.reservas.data = resultado;
        });
    } else {
      if (nomeCategoria === '') {
        this.reservasService
          .ObterReservasPeloUsuarioId(this.usuarioId)
          .subscribe((resultado) => {
            this.reservas.data = resultado;
          });
      }
    }

    return this.opcoesCategorias.filter((reserva) =>
    reserva.toLowerCase().includes(nomeCategoria.toLowerCase())
    );
  }

  AbrirDialog(reservaId, valor): void {
    this.dialog
      .open(DialogExclusaoReservasComponent, {
        data: {
          reservaId: reservaId,
          valor: valor,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.reservasService
            .ObterReservasPeloUsuarioId(this.usuarioId)
            .subscribe((registros) => {
              this.reservas.data = registros;
              this.reservas.paginator = this.paginator;
            });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-reservas',
  templateUrl: 'dialog-exclusao-reservas.html',
})
export class DialogExclusaoReservasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservasService: ReservasService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirReserva(reservaId): void {
    console.log(reservaId)
    this.reservasService.ExcluirReserva(reservaId).subscribe((resultado) => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
