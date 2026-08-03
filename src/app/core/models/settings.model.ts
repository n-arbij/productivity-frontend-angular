export interface SettingsResponse {
  username: string;
  email: string;
  pomodoroWorkMinutes: number;
  pomodoroShortBreakMinutes: number;
  pomodoroLongBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}
 
export interface ProfileUpdateRequest {
  username: string;
  email: string;
}
 
export interface PomodoroUpdateRequest {
  pomodoroWorkMinutes: number;
  pomodoroShortBreakMinutes: number;
  pomodoroLongBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}