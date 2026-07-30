import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthResponse, LoginRequest, RegisterRequest } from "../models/auth.model";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AuthService{
    private accessTokenSignal = signal<string | null>(null);
    isAuthenticated = computed(() => this.accessTokenSignal() !== null);

    constructor(private http: HttpClient) {}

    get accessToken(): string | null {
        return this.accessTokenSignal();
    }

    register(req: RegisterRequest): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/auth/register`, req);
    }

    login(req: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
        `${environment.apiUrl}/auth/login`,
        req,
        { withCredentials: true } // required so the refresh-token cookie gets set
        ).pipe(
            tap(res => this.accessTokenSignal.set(res.accessToken))
        );
    }

    refresh(): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
        `${environment.apiUrl}/auth/refresh`,
        {},
        { withCredentials: true }
        ).pipe(
        tap(res => this.accessTokenSignal.set(res.accessToken))
        );
    }

    logout(): void {
        this.accessTokenSignal.set(null);
    }

}