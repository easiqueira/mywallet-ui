import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetasService } from './../../../services/metas.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-metas',
  templateUrl: './listagem-metas.component.html',
  styleUrls: ['./listagem-metas.component.css'],
})
export class ListagemMetasComponent implements OnInit {
  metas = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesMetas: string[] = [];
  descricoesMetas: Observable<string[]>;
  usuarioId: string = localStorage.getItem('UsuarioId');

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private metasService: MetasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.metasService.ObterMetasPeloUsuarioId(this.usuarioId) .subscribe((resultado) => {
      resultado.forEach((meta) => {
        this.opcoesMetas.push(meta.descricao);
      });

      this.metas.data = resultado;
      this.metas.paginator = this.paginator;
      this.metas.sort = this.sort;

      console.log('metas:')
      console.log(resultado)
    });

    this.displayedColumns = this.ExibirColunas();

    this.descricoesMetas = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((descricao) => this.FiltrarNomes(descricao))
    );
  }

  ExibirColunas(): string[] {
    return ['descricao', 'valor', 'tipo', 'acoes'];
  }

  AbrirDialog(idMeta, descricao): void {
    this.dialog
      .open(DialogExclusaoMetasComponent, {
        data: {
          idMeta: idMeta,
          descricao: descricao,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.metasService.ObterTodos().subscribe((dados) => {
            this.metas.data = dados;
          });

          this.displayedColumns = this.ExibirColunas();
        }
      });
  }

  FiltrarNomes(descricao: string): string[] {
    if (descricao.trim().length >= 4) {
      this.metasService
        .FiltrarMetas(descricao.toLowerCase())
        .subscribe((resultado) => {
          this.metas.data = resultado;
        });
    } else {
      if (descricao === '') {
        this.metasService.ObterTodos().subscribe((resultado) => {
          this.metas.data = resultado;
        });
      }
    }

    return this.opcoesMetas.filter((meta) =>
    meta.toLowerCase().includes(descricao.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-dialog-exclusao-metas',
  templateUrl: 'dialog-exclusao-metas.html',
})
export class DialogExclusaoMetasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private metasService: MetasService,
    private snackBar : MatSnackBar
  ) {}

  ExcluirMeta(idMeta): void {
    this.metasService
      .ExcluirMeta(idMeta)
      .subscribe((resultado) => {
        this.snackBar.open(resultado.mensagem, null, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
  }
}
