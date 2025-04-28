import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, viewChild, ViewChild, } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PoUploadComponent, PoModule, PoUploadFile, PoTableColumn, PoTableModule, PoButtonModule, PoMenuItem, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule, PoTableAction, PoModalAction, PoDialogService, PoNotificationService, PoFieldModule, PoDividerModule, PoTableLiterals, PoTableComponent, PoUploadLiterals, PoModalComponent, } from '@po-ui/ng-components';
import { ServerTotvsService } from '../services/server-totvs.service';
import { ExcelService } from '../services/excel-service.service';
import { escape } from 'querystring';
import { environment } from '../environments/environment'
@Component({
  selector: 'app-tela-oracle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PoModalModule,
    PoTableModule,
    PoModule,
    PoFieldModule,
    PoDividerModule,
    PoButtonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
  ],
  templateUrl: './tela-enc.component.html',
  styleUrl: './tela-enc.component.css'
})
export class TelaEncComponent {

  private router = inject(Router);
  private formImport = inject(FormBuilder);
  private formB = inject(FormBuilder);

  //Formulario
  public form = this.formImport.group({
    cChave: ['', Validators.required],
    //codFilial: ['', Validators.required],
    //numRR: ['', Validators.required],
    //itCodigo: [''],
    //tpBusca: [2, Validators.required],
  }); 

  public formAltera = this.formB.group({
    "qt-troca": [0, Validators.required],
    
  });

  //Variáveis
  lBotao: boolean = false
  labelLoadTela: string = ''
  loadTela: boolean = false

  //---Grid
  colunas!: PoTableColumn[]
  lista!: any[]
  alturaGrid: number = window.innerHeight - 410

  @ViewChild('telaAltera', { static: true }) telaAltera:  | PoModalComponent  | undefined;


  customLiterals: PoTableLiterals = {
    noData: 'Infome os filtros para Buscar os Dados',
    loadMoreData: 'Carregar mais',
    loadingData: 'Buscar '
  }

  ChamaObterDadosEsaa068(){}
  onOracle(){ this.router.navigate(['tela-oracle']) }
  onTotvs(){ this.router.navigate(['tela']) }
  onExportarExcel(){}
  onChangeOptions(event: any): void {}
  onAlterarGrid(event: any): void {}
  OnSeleciona(event: any): void {}

  readonly acaoAlterarLinha: PoModalAction = {
    label: 'Salvar',
    action: () => {
      //this.alterarOrdem()
    },
   
    disabled: !this.formAltera.valid,
  };

  readonly acaoCancelarLinha: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      this.telaAltera?.close();
    },
  };

}
