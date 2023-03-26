
import { MetasService } from './../../../services/metas.service';
import { TiposService } from './../../../services/tipos.service';
import { Tipo } from './../../../models/Tipo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nova-meta',
  templateUrl: './nova-meta.component.html',
  styleUrls: ['../listagem-metas/listagem-metas.component.css'],
})
export class NovaMetaComponent implements OnInit {
  formulario: any;
  usuarioId: string = localStorage.getItem('UsuarioId');
  tipos: Tipo[];
  erros: string[];

  constructor(
    private tiposService: TiposService,
    private metasService: MetasService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.tiposService.ObterTodos().subscribe((resultado) => {
      this.tipos = resultado;
    });



    this.formulario = new FormGroup({
      descricao: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      valor: new FormControl(null, [Validators.required]),
      usuarioId: new FormControl(this.usuarioId),
      idTipoMovimentacao: new FormControl(null, [Validators.required]),
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const meta = this.formulario.value;
    console.log(meta);

    this.erros = [];
    this.metasService.NovaMeta(meta).subscribe(
      (resultado) => {
        this.router.navigate(['metas/listagemmetas']);
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
    this.router.navigate(['metas/listagemmetas']);
  }
}
