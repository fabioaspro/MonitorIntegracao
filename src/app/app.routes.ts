import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '', redirectTo: '/tela', pathMatch: 'full'},
    {path:'tela', loadComponent:()=> import('../app/tela/tela.component').then(c=>c.TelaComponent)},
    //{path:'lista-itens', loadComponent:()=> import('../app/lista-itens/lista-itens.component').then(c=>c.ListaItensComponent)},
];
