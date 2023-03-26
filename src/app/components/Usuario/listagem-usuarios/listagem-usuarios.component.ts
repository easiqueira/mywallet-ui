import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosService } from './../../../services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css'],
})
export class ListagemUsuariosComponent implements OnInit {
  usuarios = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  opcoesUsuarios: string[] = [];
  nomesUsuarios: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuariosService.ObterTodos().subscribe((resultado) => {
      resultado.forEach((usuario) => {
        this.opcoesUsuarios.push(usuario.nome);
      });

      this.usuarios.data = resultado;
      this.usuarios.paginator = this.paginator;
      this.usuarios.sort = this.sort;

      console.log(this.usuarios.data);
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesUsuarios = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  ExibirColunas(): string[] {
    return ['nome','cpf','profissao','email', 'acoes'];
  }

  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.usuariosService
        .FiltrarUsuarios(nome.toLowerCase())
        .subscribe((resultado) => {
          this.usuarios.data = resultado;
        });
    } else {
      if (nome === '') {
        this.usuariosService.ObterTodos().subscribe((resultado) => {
          this.usuarios.data = resultado;
        });
      }
    }
    return this.opcoesUsuarios.filter((usuario) =>
    usuario.toLowerCase().includes(nome.toLowerCase())
    );
  }

  AbrirDialog(id, nome): void {  
    console.log('id: ' + id);
    console.log('nome: ' + nome);  
    this.dialog
      .open(DialogExclusaoUsuariosComponent, {
        data: {
          usuarioId: id,
          nome: nome,
        },
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.usuariosService.ObterTodos().subscribe((dados) => {
            this.usuarios.data = dados;
            this.usuarios.paginator = this.paginator;
          });
          this.displayedColumns = this.ExibirColunas();
        }
      });
  }
}

@Component({
  selector: 'app-dialog-exclusao-usuarios',
  templateUrl: 'dialog-exclusao-usuarios.html',
})
export class DialogExclusaoUsuariosComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {}

  ExcluirUsuario(usuarioId): void {
    this.usuariosService.ExcluirUsuario(usuarioId).subscribe((resultado) => {
      this.snackBar.open(resultado.mensagem, null, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }
}
