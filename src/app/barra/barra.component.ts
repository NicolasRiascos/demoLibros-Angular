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
  public authorList: Array<string>;
  public libros: any;

  constructor(private clienteService: ClienteService) {
    this.authorList = new Array();
  }

  postLibro() {
    const nuevoLibro = this.enteredText.split(',');
    console.log('Guardado ' + nuevoLibro);
    let libro: Libro = {autor: nuevoLibro[0], nombre: nuevoLibro[1], fecha: new Date()};
    this.clienteService.addLibro(libro).subscribe((data: {}) => {
      console.log( 'data' + data);
    } );
  }

// Llama la info del api, compara cada elemeno con el autor ingresado y genera un nuevo listado
  filtro(autor: string) {
    this.clienteService.getLibro()
      // clone the data object, using its known Config shape
      .subscribe((data: {}) => {
        console.log(data);
        this.libros = data;
        this.getAutores(); // actualiza lista de autores
        const librosAux = [];
        console.log(autor);
        if (autor === 'Seleccionar...' ) {console.log('Seleccionar...'); } else {
        this.libros.forEach(libro => {
          console.log(libro.autor);
          if ((libro.autor.trim()) === String(autor)) { // tirm() elimina los espacios al comienzo y al final
            console.log('TRUE');
            librosAux.push(libro);
          }
        });
        this.libros = librosAux;
        console.log(this.libros);
        }


      });
  }


// obtiene una lista de auotres no repetidos
  getAutores() {
    this.libros.forEach(libro => {
      console.log(this.authorList.includes( libro.autor ));
      if (!(this.authorList.includes(libro.autor))) {
        this.authorList.push(libro.autor.trim());
      }
    });
    this.authorList.sort();
    console.log(this.authorList);
  }



  ngOnInit() {
    // this.authorList.push('Seleccionar...');
    this.clienteService.getLibro().subscribe((data: {}) => {
      console.log(data);
      this.libros = data;
      this.getAutores();
    });
  }



}


