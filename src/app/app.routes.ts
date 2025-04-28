import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '', redirectTo: '/tela', pathMatch: 'full'},
    {path:'tela', loadComponent:()=> import('../app/tela/tela.component').then(c=>c.TelaComponent)},
    {path:'tela-oracle', loadComponent:()=> import('../app/tela-oracle/tela-oracle.component').then(c=>c.TelaOracleComponent)},
    {path:'tela-enc', loadComponent:()=> import('../app/tela-enc/tela-enc.component').then(c=>c.TelaEncComponent)},
];
