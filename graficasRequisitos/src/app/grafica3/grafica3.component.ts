import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'; // Asegúrate de importar registerables


@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {
  jsonData: any[] = [];
  chart: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Registra los módulos necesarios para las escalas 'linear' y 'category' (opcional si no se han registrado previamente)
    Chart.register(...registerables);

    this.http.get<any[]>('/assets/formato_data1.json').subscribe(data => {
      this.jsonData = data;
      this.generateChart();
    });
  }

  generateChart() {
    const motivoContactado = this.jsonData.filter(item => item['motivo'] === 'CONTACTADO').length;
    const motivoBuzon = this.jsonData.filter(item => item['motivo'] === 'BUZON DE VOZ').length;
    const motivoCNE = this.jsonData.filter(item => item['motivo'] === 'CNE NO PUEDE RECIBIR LLAMADAS- MILITAR RECLUSO ETC').length;
    const motivoEquivocado = this.jsonData.filter(item => item['motivo'] === 'EQUIVOCADO').length;
    const motivoOtro = this.jsonData.filter(item => item['motivo'] === 'LLAMAR A OTRO TELEFONO').length;
    const motivoNoContesta = this.jsonData.filter(item => item['motivo'] === 'NO CONTESTA ').length;
    const motivoOcupado = this.jsonData.filter(item => item['motivo'] === 'SUENA OCUPADO').length;
    const motivoTitular = this.jsonData.filter(item => item['motivo'] === 'TITULAR NO SE ENCUENTRA').length;
    const motivoFaxx = this.jsonData.filter(item => item['motivo'] === 'TONO DE FAX ').length;
    const motivoVolverLlamar = this.jsonData.filter(item => item['motivo'] === 'VOLVER A LLAMAR').length;

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Contactado', 'Buzon de voz', 'CNE no recibir llamadas', 'Equivocado', 'Llamar otro telefono', 'No contesta', 
                 'Ocupado', 'No disponible', 'Tono Faxx', 'Volver a comunicarse'],
        datasets: [
          {
            data: [motivoContactado, motivoBuzon, motivoCNE, motivoEquivocado, motivoOtro,
              motivoNoContesta, motivoOcupado, motivoTitular, motivoFaxx, motivoVolverLlamar],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',   
              'rgba(255, 159, 64, 0.2)',  
              'rgba(153, 102, 255, 0.2)'],
              borderColor: [
                'rgba(255, 99, 132)',   
                'rgba(255, 159, 64)',  
                'rgba(153, 102, 255)'],
              borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: 'category', // Utiliza el tipo 'category' para el eje x
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
