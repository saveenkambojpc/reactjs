import dayjs from "dayjs";

export function dateTimeFormatOut(datetime: string) {
  return datetime ? dayjs(datetime).format(" DD-MM-YY, hh:mm A") : "";
}
export function dateFormatOut(datetime: string) {
  return datetime ? dayjs(datetime).format("DD-MM-YY") : "";
}

export function serverAcceptedDateTime(date: dayjs.Dayjs | null): string {
  return date ? dayjs(date).format("YYYY-MM-DDThh:mm:SSS[Z]") : ""

  //   return `${yyyy}-${mm}-${dd}T${hh}:${min}:${sec}.${ms}`;
}
export function serverAcceptedDate(date: dayjs.Dayjs | null): string {
  return date ? dayjs(date).format("YYYY-MM-DD") : ""
}
export function serverAcceptedTime(date: dayjs.Dayjs | null): string {
  // 18:33:34
  return date ? dayjs(date).format("HH:mm:ss") : ""
}