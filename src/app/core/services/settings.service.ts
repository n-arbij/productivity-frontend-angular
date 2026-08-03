import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PomodoroUpdateRequest, ProfileUpdateRequest, SettingsResponse } from "../models/settings.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class SettingsService {
  // TODO: point this at your actual API base (e.g. via environment.ts / an
  // interceptor that already prefixes API calls).
  private readonly API = `${environment.apiUrl}/settings`;
 
  constructor(private http: HttpClient) {}
 
  getSettings(): Observable<SettingsResponse> {
    return this.http.get<SettingsResponse>(this.API);
  }
 
  updateProfile(request: ProfileUpdateRequest): Observable<SettingsResponse> {
    return this.http.put<SettingsResponse>(`${this.API}/profile`, request);
  }
 
  updatePomodoro(request: PomodoroUpdateRequest): Observable<SettingsResponse> {
    return this.http.put<SettingsResponse>(`${this.API}/pomodoro`, request);
  }
}