import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApigptService {

      private apiUrl = 'https://api.openai.com/v1/chat/completions';
      private apiKey = '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'; // Reemplaza esto con tu propia API key de OpenAI

      constructor(private http: HttpClient) { }

      public sendChatRequest(): Observable<any> {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.apiKey}`);

        const options = {
            headers,
            withCredentials: true // Habilitar envío de credenciales
          };

        const body = {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: 'Lista tres ideas de negocio para un emprendedor que sueñe con una casa en el campo y que tenga conocimientos en ventas y que tenga experiencia en atención al público, no necesito el detalle, solo el nombre de la idea.'
            }
          ]
        };

        return this.http.post(this.apiUrl, body, options);
      }

}
