import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposService } from './../../../services/tipos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizar-tipo',
  templateUrl: './atualizar-tipo.component.html',
  styleUrls: ['../listagem-tipos/listagem-tipos.component.css'],
})
export class AtualizarTipoComponent implements OnInit {
  idTipoMovimentacao: number;
  nome: string;
  formulario: any;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tiposService: TiposService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.idTipoMovimentacao = this.route.snapshot.params.id;

    this.tiposService.ObterTipoMovimentacaoPeloId(this.idTipoMovimentacao).subscribe((resultado) => {
      this.nome = resultado.nome;

      this.formulario = new FormGroup({
        idTipoMovimentacao: new FormControl(resultado.idTipoMovimentacao),
        nome: new FormControl(resultado.nome, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
      });
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    this.erros = [];
    const tipo = this.formulario.value;

    this.tiposService.AtualizarTipoMovimentacao(this.idTipoMovimentacao, tipo).subscribe(
      (resultado) => {
        this.router.navigate(['/tipos/listagemtipos']);
        this.snackBar.open(resultado.mensagem, null, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (err) => {
        if (err.status === 400) {
          for (const campo in err.error.errors) {
            if (err.error.errors.hasOwnProperty(campo)) {
              this.erros.push(err.error.errors[campo]);
            }
          }
        }
      }
    );
  }

  VoltarListagem(): void {
    this.router.navigate(['/tipos/listagemtipos']);
  }
}
