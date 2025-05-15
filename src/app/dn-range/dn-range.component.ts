import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, EventEmitter, Component, inject, Input, input, OnInit, Output, viewChild, ViewChild, forwardRef, } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PoUploadComponent, PoModule, PoUploadFile, PoTableColumn, PoTableModule, PoButtonModule, PoMenuItem, PoMenuModule, PoModalModule, PoPageModule, PoToolbarModule, PoTableAction, PoModalAction, PoDialogService, PoNotificationService, PoFieldModule, PoDividerModule, PoTableLiterals, PoTableComponent, PoUploadLiterals, PoModalComponent, } from '@po-ui/ng-components';
import { ServerTotvsService } from '../services/server-totvs.service';
import { ExcelService } from '../services/excel-service.service';
import { escape } from 'querystring';
import { environment } from '../environments/environment'
import { format } from 'path';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'dn-range',
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
    NgxMaskDirective,
  ],
  templateUrl: './dn-range.component.html',
  styleUrl: './dn-range.component.css',
  providers: [
    provideNgxMask()
  ]
})
export class DnRangeComponent {
  
  @Input() label: string = 'Periodo'
  @Input() tipo: string = ''
  @Input() cmask: string = ''
  @Input() inicial: any
  @Input() final: any
  @Input() cLabel: string = ''
  @Input() clabel!:string
  @Input() cini:string=''
  @Input() cfim:string=''
  @Output() ciniChange = new EventEmitter<string>();
  @Output() cfimChange = new EventEmitter<string>();
 
  retorno(): void {
    this.ciniChange.emit(this.cini)
    this.cfimChange.emit(this.cfim)
  }
  
}