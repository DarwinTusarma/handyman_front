import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TechnicianModel } from '@shared/models/technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  private readonly url = `${environment.apiUrl}/technicians`;

  constructor(private readonly http: HttpClient) { }//<ServiceTechnicianModel | ServiceTechnicianResponse>

  queryByDocument(type: string, number: string): Observable<TechnicianModel> {
    let params: HttpParams = new HttpParams();
    params = params.append("type", type);
    params = params.append("number", number);
    return this.http.get<TechnicianModel>(`${this.url}/document`, { params });
  }
  
}
