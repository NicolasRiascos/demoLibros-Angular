import { Component, OnInit, Input } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('parentData') public libros;


  // public libros: Array<Libro>;
  constructor(private clienteService: ClienteService) {
    this.showLibros();
  }


  showLibros() {
    this.clienteService.getLibro()
      // clone the data object, using its known Config shape
      .subscribe((data: Array<Libro>) => {this.libros = data; console.log(this.libros); });
  }


  filterBooks(autor: string) {
    const librosAux = [];
    this.libros.forEach(libro => {
      if (libro.autor === autor) {
        librosAux.push(libro);
      }
    });
    this.libros = librosAux;
    console.log(this.libros);
  }




  ngOnInit() {
  }


}


/*
  export class TablaComponent implements OnInit {

  public libros: Array<Libro>;
  constructor() {
    this.libros = [{autor: 'Tolkien', nombre: 'El señor de los anillos', fecha: new Date()},
    {autor: 'Gabriel Garcia Marquez', nombre: 'Cien años de soledad', fecha: new Date()},
    {autor: 'JK Rowling', nombre: 'Harry Potter', fecha: new Date()},
    {autor: 'JK Rowling', nombre: 'Animales fantasticos', fecha: new Date()}];
  }

  ngOnInit() {
  }


}

  */
