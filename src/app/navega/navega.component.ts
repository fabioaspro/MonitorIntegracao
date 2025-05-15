import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoIconModule, PoLoadingModule, PoTableModule, PoTooltipModule } from '@po-ui/ng-components';
import { Goto } from '../goto';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'dn-navega',
  standalone: true,
  imports: [NgIf, PoLoadingModule, PoFieldModule, FormsModule, PoIconModule, PoButtonModule, PoTableModule, NgStyle, PoTooltipModule,NgxMaskDirective],
  templateUrl: './navega.component.html',
  styleUrl: './navega.component.css',
  providers: [
      provideNgxMask()
    ]
})
export class NavegaComponent {

  @Input() form!:FormGroup
  @Input() apenasConsulta=false
  @Input() vaPara!:Goto
  @Output() funcao=new EventEmitter<string>()
  @Output() goto=new EventEmitter<Goto>()

  lsave=false
  opcao:string=''

  onClick(opcao:string){
    if(opcao === 'goto'){
      this.goto.emit(this.vaPara)
    }

    if(opcao === 'zoom'){
    }

    if(opcao === "inc" || opcao === "mod"){
      this.form.enable()
    }
    else{
     this.form.disable()
    }
        
    if(opcao === "inc" || opcao === "mod" || opcao ==="cancel" || opcao === "save")
       this.lsave=!this.lsave

    this.opcao=opcao
    this.funcao.emit(opcao)
  }

  ngOnInit():void{
    this.form.disable()
  }

}
