import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CepService {
	private url: string = "https://viacep.com.br/ws/";

	constructor(public http: HttpClient) { }

	getCep(cep): Observable<any> {
		if (cep.length === 8) {
			return this.http.get<any>(`${this.url}${Number(cep)}/json`);
		}
	}
}