import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map, of, take, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { PoTableColumn } from '@po-ui/ng-components';
import { environment } from '../environments/environment'

//--- Header somente para DEV
const headersTotvs = new HttpHeaders(environment.totvs_header)

@Injectable({
  providedIn: 'root'
})
export class ServerTotvsService {
  private reg!:any;
  _url = environment.totvs_url
  _urlNavega = environment.totvs_url_navega
  
  constructor(private http: HttpClient ) { }

  
  //---------------------- Variaveis Globais
  public ObterVariaveisGlobais(params?: any){
    return this.http.get(`${this._url}/ObterVariaveisGlobais`, {params, headers:headersTotvs}).pipe(take(1));
  }

  //Chama tela do TOTVS
  public AbrirTelaTOTVS(params?:any){
    return this.http.get('/totvs-menu/rest/exec', { params, headers: headersTotvs }).pipe(take(1));
  }
  
  //------------ Colunas Grid ESAA052
  obterColunasEsaa052(): Array<PoTableColumn> {
    return [
      { property: 'idBatch',       label: "idBatch", type: 'number', visible: false},
      { property: 'Chave',         label: "Chave", visible: false},
      { property: 'Integracao',    type:'label', width: '150px',
        labels: [
          { value: 'int001', label: 'Envio'      , icon: 'bi bi-send' },
          { value: 'int002', label: 'Recebimento', icon: 'bi bi-cloud-download'}
        ]
      },
      { property: 'Estab',         label: "Estab"},
      { property: 'serie',         label: "Série", width: '80px'},
      { property: 'numOS',         label: "NumOS/Nota"},
      { property: 'itCodigo',      label: "Item/Tipo"},
      { property: 'nrEnc',         label: "ENC"},     
      { property: 'Lote',          label: "Lote"},
      { property: 'DtHrInc',       label: "DtHrInc",  type:'date', format: "dd/MM/yyyy"},
      { property: 'DtHrEnv',       label: "DtHrEnv",  type:'date', format: "dd/MM/yyyy"},
      { property: 'QtdReprocessa', label: "QtdReprocessa", width: '150px'},
      { property: 'Pendente',      type:'label',
          labels: [
            { value: 'true',  textColor: 'white', color: 'color-07', label: 'Pendente' },
            { value: 'false', textColor: 'white', color: 'color-10', label: 'Enviado' }
          ]
        },
      { property: 'Origem',        label: 'Origem', visible: false}, 
      
    ];
  }

  obterColunasErrorEsaa052(): Array<PoTableColumn> {
    return [
      { property: 'idBatch',       label: "ID", type: 'number', format: "1.0-0", visible: false},
      { property: 'SeqError',      label: "Seq"},
      { property: 'msgErro',       label: "Msg Error"},
      { property: 'Erro',          label: "Erro"},
      { property: 'DtHrError',     label: "Dt/Hr Error", type:'date', format: "dd/MM/yyyy"},
    ];
  }

  //------------ Colunas Grid ESAA068
  obterColunasEsaa068(): Array<PoTableColumn> {
    return [
      { property: 'idBatch',       label: "IDBatch", type: 'number', format: "1.0-0", visible: false},
      { property: 'Chave',         label: "Chave", visible: true},
      { property: 'Estab',         label: "Estab"},
      { property: 'numOS',         label: "NumOS", visible: false},
      { property: 'serie',         label: "Série", visible: false},
      { property: 'itCodigo',      label: "Item", visible: false},
      { property: 'nrEnc',         label: "ENC", visible: false},     
      { property: 'Integracao',    label: "Integracao"},
      { property: 'Lote',          label: "Lote"},
      { property: 'DtHrInc',       label: "DtHrInc", type:'date', format: "dd/MM/yyyy"},
      { property: 'DtHrEnv',       label: "DtHrEnv", type:'date', format: "dd/MM/yyyy"},
      { property: 'Pendente',      label: "Pendente"},
      { property: 'Origem',        label: 'Origem', visible: false}, 
      { property: 'QtdReprocessa', label: "QtdReprocessa", visible: false},
    ];
  }

  obterColunasErrorEsaa068(): Array<PoTableColumn> {
    return [
      { property: 'idBatch',       label: "ID", type: 'number', format: "1.0-0", visible: false},
      { property: 'SeqError',      label: "Seq"},
      { property: 'msgErro',       label: "Msg Error"},
      { property: 'Erro',          label: "Erro"},
      { property: 'DtHrError',     label: "Dt/Hr Error", type:'date', format: "dd/MM/yyyy"},
    ];
  }

  //---------------------- DN-NAVEGA
  public ObterRegistro(params?: any){
    return this.http.post(`${this._urlNavega}`, params, {headers:headersTotvs}).pipe(take(1))
  }

  //---------------------- Obter Lista Completa
  public UpdloadArquivo(params?: any){
    return this.http.post(`${this._url}/addFiles`, params, {headers:headersTotvs}).pipe(take(1))
  }

  //---------------------- Obter Lista Completa
  public EfetivarArquivo(params?: any){
    return this.http.post(`${this._url}/EfetivarArquivo`, params, {headers:headersTotvs}).pipe(take(1))
  }
  
  //---------------------- Obter Lista Completa
  public ObterArquivo(params?: any){
    return this.http.get(`${this._url}/ObterArquivo`, {params:params, headers:headersTotvs}).pipe(take(1));
  }

  //---------------------- Obter Lista Completa
  public ObterDadosEsaa052(params?: any){
    return this.http.post(`${this._url}/ObterDadosEsaa052`, params, {headers:headersTotvs}).pipe(take(1))
  }

  public ObterDadosErrorEsaa052(params?: any){
    return this.http.post(`${this._url}/ObterDadosErrorEsaa052`, params, {headers:headersTotvs}).pipe(take(1))
  }

  //Usando paginação
  public ObterDadosPagEsaa052(params?: any){
    return this.http.post(`${this._url}/ObterDadosPagEsaa052`, params, {headers:headersTotvs}).pipe(take(1))
  }

  //---------------------- Obter Lista Completa
  public ObterDadosEsaa068(params?: any){
    return this.http.post(`${this._url}/ObterDadosEsaa068`, params, {headers:headersTotvs}).pipe(take(1))
  }

  public ObterDadosErrorEsaa068(params?: any){
    return this.http.post(`${this._url}/ObterDadosErrorEsaa068`, params, {headers:headersTotvs}).pipe(take(1))
  }

  //Usando paginação
  public ObterDadosPagEsaa068(params?: any){
    return this.http.post(`${this._url}/ObterDadosPagEsaa068`, params, {headers:headersTotvs}).pipe(take(1))
  }
  
  //abaixo não é usado, só exemplo
  //------------ Colunas Grid Prioridade
  obterColunasEmergencial(): Array<PoTableColumn> {
    return [         
      { property: 'Ativo', label: 'Ativo', type: 'subtitle',
        subtitles: [
          { value: 'Sim', color: 'color-10', label: '', content: 'S'},
          { value: 'Não', color: 'color-07', label: '', content: 'N'},
        ]},
      { property: 'codEstabel',    label: "Estab"},
      { property: 'codFilial',     label: "Fil Emerg"},
      { property: 'itCodigo',      label: "Item", width: '300px' },
      { property: 'qtdEmerg',      label: "Qtd.Emerg."},
      { property: 'qtdPend',       label: "Qtd.Pend."},
      { property: 'Obs',           label: "Observação"},
      { property: 'Inclusao',      label: "Inclusão"},      
    ];
  }
  //Retorno transformado no formato {label: xxx, value: yyyy}
  public ObterEstabelecimentos(params?: any){
    return this.http.get<any>(`${this._url}/ObterEstab`, {params: params, headers:headersTotvs})
                 .pipe(
                  ///tap(data => {console.log("Retorno API TOTVS => ", data)}),
                  map(item => { return item.items.map((item:any) =>  { return { label:item.codEstab + ' ' + item.nome, value: item.codEstab, codFilial: item.codFilial } }) }),
                  ///tap(data => {console.log("Data Transformada pelo Map =>", data)}),
                  take(1));
  }
  
  //---------------------- Obter Lista Completa
  public ObterBRR(params?: any){
    return this.http.post(`${this._url}/ObterBRR`, params, {headers:headersTotvs}).pipe(take(1))
  }

  //---------------------- Obter Lista Completa
  public Obter(params?: any){
    return this.http.get(`${this._url}/ObterLT`, {params:params, headers:headersTotvs}).pipe(take(1));
  }

  //---------------------- Obter Linha Editada
  public ObterID(params?: any){
    return this.http.get(`${this._url}/ObterLTId`, {params:params, headers:headersTotvs}).pipe(take(1));
  }
  //---------------------- Salvar registro
  public Salvar(params?: any){
    return this.http.post(`${this._url}/SalvarLT`, params, {headers:headersTotvs})
                .pipe(take(1));
  }

  //---------------------- Deletar registro
  public Deletar(params?: any){
    return this.http.get(`${this._url}/DeletarEmergencial`, {params:params, headers:headersTotvs})
                    .pipe(take(1));
  }
  
  //Ordenacao campos num array
  public ordenarCampos = (fields: any[]) =>
    (a: { [x: string]: number }, b: { [x: string]: number }) =>
      fields
        .map((o) => {
          let dir = 1;
          if (o[0] === '-') {
            dir = -1;
            o = o.substring(1);
          }
          return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
        })
        .reduce((p, n) => (p ? p : n), 0);

}