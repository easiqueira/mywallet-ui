import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetasService } from './../../../services/metas.service';
import { TiposService } from './../../../services/tipos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Tipo } from './../../../models/Tipo';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Meta } from 'src/app/models/Meta';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-meta',
  templateUrl: './atualizar-meta.component.html',
  styleUrls: ['../listagem-metas/listagem-metas.component.css'],
})
export class AtualizarMetaComponent implements OnInit {
  descricaoMeta: string;
  valorMeta: number;
  idMeta: number;
  meta: Observable<Meta>;
  tipos: Tipo[];
  usuarioId: string = localStorage.getItem('UsuarioId');
  formulario: any;
  erros: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tiposService: TiposService,
    private metasService: MetasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.idMeta = this.route.snapshot.params.id;
    this.tiposService.ObterTodos().subscribe((resultado) => {
      this.tipos = resultado;
    });

    this.metasService
      .ObterMetaPeloId(this.idMeta)
      .subscribe((resultado) => {
        this.descricaoMeta = resultado.descricao;
        this.valorMeta = resultado.valor;
        this.formulario = new FormGroup({
          idMeta: new FormControl(resultado.idMeta),
          descricao: new FormControl(resultado.descricao, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50),
          ]),
          valor: new FormControl(resultado.valor, [Validators.required]),
          usuarioId: new FormControl(resultado.usuarioId),
          idTipoMovimentacao: new FormControl(resultado.idTipoMovimentacao, [Validators.required]),
        });
      });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const meta = this.formulario.value;
    this.erros = [];
    this.metasService
      .AtualizarMeta(this.idMeta, meta)
      .subscribe(
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
