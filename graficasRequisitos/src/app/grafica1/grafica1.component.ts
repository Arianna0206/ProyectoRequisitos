import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'; // Asegúrate de importar registerables


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
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
    const asistenciaSi = this.jsonData.filter(item => item['¿ ME CONFIRMAS TU ASISTENACIA?'] === 'SI').length;
    const asistenciaNo = this.jsonData.filter(item => item['¿ ME CONFIRMAS TU ASISTENACIA?'] === 'NO').length;
    const asistenciaNoSeguro = this.jsonData.filter(item => item['¿ ME CONFIRMAS TU ASISTENACIA?'] === 'NO ESTA SEGURO').length;

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Confirmado', 'No Confirmado', 'No Seguro'],
        datasets: [
          {
            data: [asistenciaSi, asistenciaNo, asistenciaNoSeguro],
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
