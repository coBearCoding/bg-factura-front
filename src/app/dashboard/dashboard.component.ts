import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { AppLayoutComponent } from '../components/layouts/app-layout/app-layout.component';
import { Product } from '../models/product';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    CommonModule,
    ButtonModule,
    ChartModule,
    TableModule,
    AppLayoutComponent,
  ],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  platformId = inject(PLATFORM_ID);

  products!: Product[];
  cols!: Column[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initChart();
    this.initProducts();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.basicData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Ventas 2025',
            data: [540, 325, 702, 620],
            backgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)',
              'rgba(139, 92, 246, 0.2)',
            ],
            borderColor: [
              'rgb(249, 115, 22)',
              'rgb(6, 182, 212)',
              'rgb(107, 114, 128)',
              'rgb(139, 92, 246)',
            ],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }

  initProducts() {
    this.products = [
      {
        code: '123123',
        name: 'Bamboo Watch',
        category: 'Accessories',
        quantity: 12,
      },
    ];

    this.cols = [
      {
        field: 'code',
        header: 'Code',
      },
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'category',
        header: 'Category',
      },
      {
        field: 'quantity',
        header: 'Quantity',
      },
    ];
  }
}
