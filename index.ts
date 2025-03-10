import { ReminderDatabase } from "./reminder";

const db = new ReminderDatabase();
db.createReminder("1", "Doctor Appointment", "Visit Dr. Smith at 5 PM", new Date("2025-03-15"));
console.log(db.getAllReminders());
db.updateReminder("1", "Dentist Appointment");
console.log(db.getReminder("1"));
db.removeReminder("1");
console.log(db.exists("1"));