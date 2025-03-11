export type Reminder = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
};

export class ReminderDatabase {
  private reminders: Map<string, Reminder>;

  constructor() {
    this.reminders = new Map<string, Reminder>();
  }

  createReminder(id: string, title: string, description: string, date: Date): void {
    if (this.reminders.has(id)) {
      throw new Error("Reminder with this ID already exists.");
    }
    this.reminders.set(id, { id, title, description, date, completed: false });
  }

  exists(id: string): boolean {
    return this.reminders.has(id);
  }

  markReminderAsCompleted(id: string): boolean {
    if (!this.reminders.has(id)) return false;
    const reminder = this.reminders.get(id)!;
    reminder.completed = true;
    this.reminders.set(id, reminder);
    return true;
  }

  unmarkReminderAsCompleted(id: string): boolean {
    if (!this.reminders.has(id)) return false;
    const reminder = this.reminders.get(id)!;
    reminder.completed = false;
    this.reminders.set(id, reminder);
    return true;
  }

  getAllReminders(): Reminder[] {
    return Array.from(this.reminders.values());
  }

  getReminder(id: string): Reminder | null {
    return this.reminders.get(id) || null;
  }

  getAllRemindersMarkedAsCompleted(): Reminder[] {
    return Array.from(this.reminders.values()).filter(reminder => reminder.completed);
  }

  getAllRemindersNotMarkedAsCompleted(): Reminder[] {
    return Array.from(this.reminders.values()).filter(reminder => !reminder.completed);
  }

  getAllRemindersDueByToday(): Reminder[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from(this.reminders.values()).filter(reminder => {
      const reminderDate = new Date(reminder.date);
      reminderDate.setHours(0, 0, 0, 0);
      return reminderDate <= today;
    });
  }

  updateReminder(id: string, title?: string, description?: string, date?: Date): boolean {
    if (!this.reminders.has(id)) {
      return false;
    }
    const existingReminder = this.reminders.get(id)!;
    this.reminders.set(id, {
      ...existingReminder,
      title: title ?? existingReminder.title,
      description: description ?? existingReminder.description,
      date: date ?? existingReminder.date,
    });
    return true;
  }

  removeReminder(id: string): boolean {
    return this.reminders.delete(id);
  }
}