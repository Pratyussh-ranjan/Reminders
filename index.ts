import { ReminderDatabase } from "./reminder";

const db = new ReminderDatabase();
db.createReminder("1", "Doctor Appointment", "Visit Dr. Smith at 5 PM", new Date("2025-03-15"));
db.createReminder("2", "Meeting", "Client meeting at 10 AM", new Date());
db.markReminderAsCompleted("1");
console.log("All Reminders:", db.getAllReminders());
console.log("Completed Reminders:", db.getAllRemindersMarkedAsCompleted());
console.log("Pending Reminders:", db.getAllRemindersNotMarkedAsCompleted());
console.log("Reminders Due Today:", db.getAllRemindersDueByToday());
db.updateReminder("2", "Updated Meeting", "Updated Client meeting");
console.log("Updated Reminder:", db.getReminder("2"));
db.removeReminder("1");
console.log("Reminder Exists (1):", db.exists("1"));