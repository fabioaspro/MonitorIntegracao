import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, viewChild, ViewChild, } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PoUploadComponent, PoModule, PoUploadFile, PoTableColumn, PoTableModule, PoButtonModule, PoMenuItem, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule, PoTableAction, PoModalAction, PoDialogService, PoNotificationService, PoFieldModule, PoDividerModule, PoTableLiterals, PoTableComponent, PoUploadLiterals, PoModalComponent, PoInputComponent, } from '@po-ui/ng-components';
import { ServerTotvsService } from '../services/server-totvs.service';
import { ExcelService } from '../services/excel-service.service';
import { escape } from 'querystring';
import { environment } from '../environments/environment'
import { Goto } from '../goto';
import { NavegaComponent } from '../navega/navega.component';

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
    NavegaComponent
  ],
  templateUrl: './tela-enc.component.html',
  styleUrl: './tela-enc.component.css'
})
export class TelaEncComponent {

  private srvTotvs = inject(ServerTotvsService);
  private router = inject(Router);
  private formImport = inject(FormBuilder);
  private formZoom = inject(FormBuilder);
  private formB = inject(FormBuilder);

  //Formulario
  public form = this.formImport.group({
    'nr-enc': ['', Validators.required],
    'CodFilial': ['', Validators.required],
    'cod-estabel': ['', Validators.required],
    'DefInd': ['', Validators.required],
    'atividade': ['', Validators.required],
    //numRR: ['', Validators.required],
    //itCodigo: [''],
    //tpBusca: [2, Validators.required],
  }); 

  public formTelaZoom = this.formZoom.group({
    "znr-enc": ['', Validators.required],
  });

  public formAltera = this.formB.group({
    "qt-troca": [0, Validators.required],
    
  });

  //Variáveis
  lBotao: boolean = false
  labelLoadTela: string = ''
  loadTela: boolean = false
  
  //Zoom
  registrosZoom!:any[]
  colunasZoom!: any[]

  opcoesGridZoom: Array<PoTableAction> = [

    // {label: "", action: this.Detalhe.bind(this), icon: 'po-icon po-icon-clipboard' },
  ]

  //Variavel para o dn-navega
  rRowid: string = ''
  cOpcao: string =''
  cRegistro: any

  //---Grid
  colunas!: PoTableColumn[]
  lista!: any[]
  alturaGrid: number = window.innerHeight - 410

  @ViewChild('telaAltera', { static: true }) telaAltera:  | PoModalComponent  | undefined;
  @ViewChild('ChamaZoom') telaZoom!: PoModalComponent;
  @ViewChild('estab', { static: false}) estab!: PoInputComponent;
  @ViewChild('def', { static: false}) def!: PoInputComponent;
  

  customLiterals: PoTableLiterals = {
    noData: 'Infome os filtros para Buscar os Dados',
    loadMoreData: 'Carregar mais',
    loadingData: 'Buscar '
  }

  ngOnInit(): void {

    this.acao('first')

  }

  ChamaObterDadosEsaa068(){}
  onOracle(){ this.router.navigate(['tela-oracle']) }
  onTotvs(){ this.router.navigate(['tela']) }
  onExportarExcel(){}
  onChangeOptions(event: any): void {}
  onAlterarGrid(event: any): void {}
  OnSeleciona(event: any): void {}
  
  //Zoom
  buscarEnc(){}
  btCancelar(){}

  btAplicar(){

    /*let itCodigoSelecionado = this.GridZoom.getSelectedRows()
    //itCodigoSelecionado.forEach((item) => { registrosComSeparador += item['itCodigo'] });
    
    this.telaZoom.close()

    this.form.patchValue(itCodigoSelecionado)
    this.rRowid = itCodigoSelecionado.items[0].cRowId
    */
  }

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

  //DN-NAVEGA
  gotoCampos:Goto={campo1: {label:'ENC', mask:'', value:''}
                  //  ,campo2: {label:'Enc', mask:'', value:''}
 
  }

  goto(opcao:Goto){
    let params: any = {
        "params":{
            "tabela":"pr-enc",
            "campos":"",
            "metodo":"goto",
            "cRowId": ""
           
        },
        "vapara":{
            "campo1":this.gotoCampos.campo1?.value,
            "campo2":"",
            "campo3":""
        }
    }
    this.srvTotvs.ObterRegistro(params).subscribe({
      next: (response: any) => {
        this.cRegistro = response.items[0]
        this.form.patchValue(response.items[0])
        this.rRowid = response.items[0].cRowId        
      },
      error: (e) => {
        //this.srvNotification.error('Ocorreu um erro ObterDados: ' + e)
        //this.loadDadosError = false
        //this.habilitaForm()
      },
    }) 
  }

  chamaZoom(){

    this.registrosZoom = []
    this.formTelaZoom.controls['znr-enc'].setValue ("")
    this.telaZoom.open();
  }

  acao(opcao:string){
   
    if(opcao==='inc' || opcao==='mod'){
    this.cOpcao = opcao
    }

    if(opcao==='zoom'){

        this.chamaZoom()
    }
    else{

      if(opcao==='save'){
        let params: any = {
            acao: this.cOpcao,
            registro: this.form.getRawValue()
        }

        console.log(params)
        //metodo totvs
      }
      
      if(opcao==='cancel'){

        this.form.patchValue(this.cRegistro)
      }

      if(opcao==='inc'){
        this.form.reset()
        
        setTimeout(() => this.estab.focus(), 0)
      }
      else if(opcao==='mod'){

        this.form.controls['cod-estabel'].disable()
        this.form.controls['CodFilial'].disable()
        this.form.controls['nr-enc'].disable()
        
        setTimeout(() => this.def.focus(), 0)

      }
      else {

        let params: any = {
            "params":{
                "tabela":"pr-enc",
                "campos":"",
                "metodo":opcao,
                "cRowId": this.rRowid
              
            },
            "vapara":{
                "campo1":"",
                "campo2":"",
                "campo3":""
            }
        }

        this.srvTotvs.ObterRegistro(params).subscribe({
          next: (response: any) => {

            this.cRegistro = response.items[0]

            this.form.patchValue(response.items[0])

            this.rRowid = response.items[0].cRowId   
            
          },
          error: (e) => {
            //this.srvNotification.error('Ocorreu um erro ObterDados: ' + e)
            //this.loadDadosError = false
            //this.habilitaForm()
          },
        })
      }
    }

    if(opcao==='del'){
      alert("vou eliminar" + this.form.controls['nr-enc'].value)
    }

  }

}
