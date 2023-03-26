import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposService } from './../../../services/tipos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-tipo',
  templateUrl: './novo-tipo.component.html',
  styleUrls: ['../listagem-tipos/listagem-tipos.component.css'],
})
export class NovoTipoComponent implements OnInit {
  formulario: any;
  erros: string[];

  constructor(
    private router: Router,
    private tiposService: TiposService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];

    this.formulario = new FormGroup({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const tipo = this.formulario.value;
    this.erros = [];
    this.tiposService.NovoTipoMovimentacao(tipo).subscribe(
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
