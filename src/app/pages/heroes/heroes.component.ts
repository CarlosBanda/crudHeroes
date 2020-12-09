import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = []
  cargando = false

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {

    this.cargando= true
    this.heroesServices.getHeroes()
        .subscribe(resp=>{
          this.heroes =resp;
          this.cargando = false
        });
  }

  borrarHeroe(heroe: HeroeModel, i: number){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que quiere eliminar a ${heroe.nombre}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton:true
    }).then(resp =>{
      if(resp.value){
        this.heroes.splice(i, 1) //borra al elemento de la tabla automaticamente
    this.heroesServices.borrarHeroe(heroe.id).subscribe()
      }
    })

    
  }

}
