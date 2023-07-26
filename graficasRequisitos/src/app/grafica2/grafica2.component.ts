import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'; // Asegúrate de importar registerables

@Component({
  selector: 'app-grafica2',
  templateUrl: './grafica2.component.html',
  styleUrls: ['./grafica2.component.css']
})
export class Grafica2Component implements OnInit {
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
    const nomenclatura1 = this.jsonData.filter(item => item['nomenclatura'] === 'ACEPTACION').length;
    const nomenclatura2 = this.jsonData.filter(item => item['nomenclatura'] === 'AGENDAMIENTO').length;
    const nomenclatura3 = this.jsonData.filter(item => item['nomenclatura'] === 'CONTACTO FALLIDO JUSTIFICADO').length;
    const nomenclatura4 = this.jsonData.filter(item => item['nomenclatura'] === 'NO CONTACTO').length;

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Acepta', 'Agendado', 'Contacto fallido', 'Sin contacto'],
        datasets: [
          {
            data: [nomenclatura1, nomenclatura2, nomenclatura3, nomenclatura4],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',   
              'rgba(255, 0, 255, 0.2)',  
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)', 
            ],
              hoverOffset: 4
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
