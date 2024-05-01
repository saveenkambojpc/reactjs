// MEDICATION MASTER
export const MedicationFrequencyOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export const MedicationMealTimingOptions = [
  { label: "Before", value: "before" },
  { label: "After", value: "after" },
  { label: "With", value: "with" },
  { label: "Any", value: "any" },
];

export const weeklyDoseTimeOptions = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

export const genderOptions = [
  { label: "None", value: "None" },
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

export const doseTimeFreqDic: { [key: string]: number } = {
  daily: 3,
  weekly: 1,
  monthly: 1
}