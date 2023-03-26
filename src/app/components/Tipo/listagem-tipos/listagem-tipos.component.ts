import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TiposService } from './../../../services/tipos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listagem-tipos',
  templateUrl: './listagem-tipos.component.html',
  styleUrls: ['./listagem-tipos.component.css'],
})
export class ListagemTiposComponent implements OnInit {
  tipos = new MatTableDataSource<any>();
  displayedColumns: string[];
  autocompleteInput = new FormControl();
  opcoesTipos: string[] = [];
  nomesTipos: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private tiposService: TiposService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tiposService.ObterTodos().subscribe((resultado) => {
      resultado.forEach((tipo) => {
        this.opcoesTipos.push(tipo.nome);
      });

      this.tipos.data = resultado;
      this.tipos.paginator = this.paginator;
      this.tipos.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesTipos = this.autocompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['nome', 'acoes'];
  }

  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.tiposService
        .FiltrarTiposMovimentacao(nome.toLowerCase())
        .subscribe((resultado) => {
          this.tipos.data = resultado;
        });
    } else {
      if (nome === '') {
        this.tiposService.ObterTodos().subscribe((resultado) => {
          this.tipos.data = resultado;
        });
      }
    }

    return this.opcoesTipos.filter((tipo) =>
    tipo.toLowerCase().includes(nome.toLowerCase())
    );
  }

  AbrirDialog(idTipoMovimentacao, nome): void {    
    this.dialog
      .open(DialogExclusaoTiposComponent, {
        data: {
          idTipoMovimentacao: idTipoMovimentacao,
          nome: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.tiposService.ObterTodos().subscribe((dados) => {
            this.tipos.data = dados;
            this.tipos.paginator = this.paginator;
          });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-tipos',
  templateUrl: 'dialog-exclusao-tipos.html',
})
export class DialogExclusaoTiposComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tiposService: TiposService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirTipo(idTipoMovimentacao): void {
    this.tiposService.ExcluirTipoMovimentacao(idTipoMovimentacao).subscribe((resultado) => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
