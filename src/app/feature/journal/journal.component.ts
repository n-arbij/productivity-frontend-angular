import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JournalResponse, UpdateJournalRequest, CreateJournalRequest } from '../../core/models/journal-entry.model';
import { JournalService } from '../../core/services/journal.service';


@Component({
  selector: 'app-journal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css',
})
export class JournalComponent {
    private journalService = inject(JournalService);
    private fb = inject(FormBuilder);

    entries = signal<JournalResponse[]>([]);
    selectedEntry = signal<JournalResponse | null>(null);
    loading = signal(false);
    saving = signal(false);

    journalForm = this.fb.group({
        content: ['', Validators.required],
    })

    ngOnInit(): void {
        this.loadEntries();
    }

    loadEntries(): void{
        this.loading.set(true);
        this.journalService.getEntries().subscribe({
            next: (page) => {
                this.entries.set(page.content);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    selectEntry(event: Event, id: string): void{
        event.preventDefault();
        this.journalService.getEntry(id).subscribe({
            next: (entry) => {
                this.selectedEntry.set(entry);
                this.journalForm.patchValue({
                    content: entry.content,
                });
            }
        })
    }

    newEntry(): void{
        this.selectedEntry.set(null);
        this.journalForm.reset({content: ''});
    }

    onSubmit(): void {
        if(this.journalForm.invalid) return;

        this.saving.set(true);
        const formValue = this.journalForm.getRawValue();
        const current = this.selectedEntry();

        if(current){
            const updateReq: UpdateJournalRequest = {
                content: formValue.content!,
            };
            this.journalService.updateEntry(current.id, updateReq).subscribe({
                next: (updated) => {
                    this.selectedEntry.set(updated);
                    this.saving.set(false);
                    this.loadEntries();
                },
                error: () => this.saving.set(false)
            });
        } else {
            const createReq: CreateJournalRequest = {
                content: formValue.content!,
            };
            this.journalService.createEntry(createReq).subscribe({
                next: () => {
                    this.saving.set(false);
                    this.loadEntries();
                },
                error: () => this.saving.set(false)
            });
        }
    }

    formatDate(dateStr: string): string{
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }
}