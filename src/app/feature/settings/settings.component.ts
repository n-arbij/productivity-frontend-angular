import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SettingsService } from "../../core/services/settings.service";
import { SettingsResponse } from "../../core/models/settings.model";

type CycleSegmentType = 'work' | 'short' | 'long';
 
interface CycleSegment {
  type: CycleSegmentType;
  minutes: number;
}
 
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  username = '';
  email = '';
  profileError = '';
  profileSaved = false;
  profileSaving = false;
 
  workMinutes = 25;
  shortBreakMinutes = 5;
  longBreakMinutes = 15;
  sessionsBeforeLongBreak = 4;
  pomodoroError = '';
  pomodoroSaved = false;
  pomodoroSaving = false;
 
  loadError = '';
 
  constructor(private settingsService: SettingsService) {}
 
  ngOnInit(): void {
    this.loadSettings();
  }
 
  loadSettings(): void {
    this.loadError = '';
    this.settingsService.getSettings().subscribe({
      next: (settings) => this.applySettings(settings),
      error: () => {
        this.loadError = "COULDN'T LOAD YOUR SETTINGS";
      },
    });
  }
 
  saveProfile(): void {
    this.profileError = '';
 
    if (!this.username.trim() || !this.email.trim()) {
      this.profileError = "USERNAME AND EMAIL CAN'T BE EMPTY";
      return;
    }
 
    this.profileSaving = true;
    this.settingsService
      .updateProfile({
        username: this.username.trim(),
        email: this.email.trim(),
      })
      .subscribe({
        next: (settings) => {
          this.applySettings(settings);
          this.profileSaving = false;
          this.flash('profile');
        },
        error: () => {
          this.profileSaving = false;
          this.profileError = "COULDN'T SAVE YOUR PROFILE";
        },
      });
  }
 
  savePomodoro(): void {
    this.pomodoroError = '';
 
    const minutes = [this.workMinutes, this.shortBreakMinutes, this.longBreakMinutes];
    if (minutes.some((m) => m < 1 || m > 180)) {
      this.pomodoroError = 'MINUTES MUST BE BETWEEN 1 AND 180';
      return;
    }
    if (this.sessionsBeforeLongBreak < 1 || this.sessionsBeforeLongBreak > 10) {
      this.pomodoroError = 'SESSIONS MUST BE BETWEEN 1 AND 10';
      return;
    }
 
    this.pomodoroSaving = true;
    this.settingsService
      .updatePomodoro({
        pomodoroWorkMinutes: this.workMinutes,
        pomodoroShortBreakMinutes: this.shortBreakMinutes,
        pomodoroLongBreakMinutes: this.longBreakMinutes,
        sessionsBeforeLongBreak: this.sessionsBeforeLongBreak,
      })
      .subscribe({
        next: (settings) => {
          this.applySettings(settings);
          this.pomodoroSaving = false;
          this.flash('pomodoro');
        },
        error: () => {
          this.pomodoroSaving = false;
          this.pomodoroError = "COULDN'T SAVE YOUR POMODORO SETTINGS";
        },
      });
  }
 
  adjust(field: 'work' | 'short' | 'long' | 'sessions', delta: number): void {
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
    switch (field) {
      case 'work':
        this.workMinutes = clamp(this.workMinutes + delta, 1, 180);
        break;
      case 'short':
        this.shortBreakMinutes = clamp(this.shortBreakMinutes + delta, 1, 180);
        break;
      case 'long':
        this.longBreakMinutes = clamp(this.longBreakMinutes + delta, 1, 180);
        break;
      case 'sessions':
        this.sessionsBeforeLongBreak = clamp(this.sessionsBeforeLongBreak + delta, 1, 10);
        break;
    }
  }
 
  get cycleSegments(): CycleSegment[] {
    const segments: CycleSegment[] = [];
    for (let i = 0; i < this.sessionsBeforeLongBreak; i++) {
      segments.push({ type: 'work', minutes: this.workMinutes });
      if (i < this.sessionsBeforeLongBreak - 1) {
        segments.push({ type: 'short', minutes: this.shortBreakMinutes });
      }
    }
    segments.push({ type: 'long', minutes: this.longBreakMinutes });
    return segments;
  }
 
  get cycleTotalMinutes(): number {
    return this.cycleSegments.reduce((sum, s) => sum + s.minutes, 0);
  }
 
  segmentWidth(minutes: number): string {
    return `${(minutes / this.cycleTotalMinutes) * 100}%`;
  }
 
  private applySettings(settings: SettingsResponse): void {
    this.username = settings.username;
    this.email = settings.email;
    this.workMinutes = settings.pomodoroWorkMinutes;
    this.shortBreakMinutes = settings.pomodoroShortBreakMinutes;
    this.longBreakMinutes = settings.pomodoroLongBreakMinutes;
    this.sessionsBeforeLongBreak = settings.sessionsBeforeLongBreak;
  }
 
  private flash(which: 'profile' | 'pomodoro'): void {
    if (which === 'profile') {
      this.profileSaved = true;
      setTimeout(() => (this.profileSaved = false), 2000);
    } else {
      this.pomodoroSaved = true;
      setTimeout(() => (this.pomodoroSaved = false), 2000);
    }
  }
}