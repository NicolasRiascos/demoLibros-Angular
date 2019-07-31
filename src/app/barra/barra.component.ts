import { Component, OnInit } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  public enteredText: string;
  public authorList: Set<string>;
  public libros: any;

  constructor(private clienteService: ClienteService) {
    this.authorList = new Set();
  }

  postLibro() {
    const nuevoLibro = this.enteredText.split(',');
    console.log('Guardado ' + nuevoLibro);
    let libro: Libro = {autor: nuevoLibro[0], nombre: nuevoLibro[1], fecha: new Date()};
    this.clienteService.addLibro(libro).subscribe((data: {}) => {
      console.log( 'data' + data);
    } );
  }


  filtro(autor: string) {
    this.clienteService.getLibro()
      // clone the data object, using its known Config shape
      .subscribe((data: {}) => {
        console.log(data);
        this.libros = data;
        this.getAutores();
        const librosAux = [];
        console.log(autor);
        if (autor === 'Any' ) {} else {
        this.libros.forEach(libro => {
          console.log(libro.autor);
          if ((libro.autor) === String(autor)) {
            console.log('TRUE');
            librosAux.push(libro);
          }
        });
        this.libros = librosAux;
        console.log(this.libros);
        }


      });
  }


  getAutores() {
    this.libros.forEach(libro => {
      console.log(this.authorList.has(libro.autor));
      if (!(this.authorList.has(libro.autor))) {
        this.authorList.add(libro.autor);
      }
    });
    console.log(this.authorList);
  }



  ngOnInit() {
    this.clienteService.getLibro().subscribe((data: {}) => {
      console.log(data);
      this.libros = data;
      this.getAutores();
    });
  }



}


