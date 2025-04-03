import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Message} from 'primeng/message';
import {NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-scraping',
  templateUrl: './scraping.component.html',
  imports: [
    Card,
    Button,
    ProgressSpinner,
    Message,
    NgIf,
    TableModule,
    InputText,
    FormsModule
  ],
  styleUrls: ['./scraping.component.scss']
})
export class ScrapingComponent {
  query: string = '';
  site: string = '';
  results: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  searchProduct() {
    if (!this.query || !this.site) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }
    this.loading = true;
    this.error = null;
    this.http.get(environment.API_URL + `/product/search?query=${this.query}&site=${this.site}`).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du scraping';
        this.loading = false;
      }
    });
  }
}

