import dayjs from "dayjs";

export const timeAgo = (date: string) => {
  const now = dayjs();

  const minutes = now.diff(date, "minute");
  if (minutes < 60) return `${minutes} m`;

  const hours = now.diff(date, "hour");
  if (hours < 24) return `${hours} h`;

  const days = now.diff(date, "day");
  if (days < 7) return `${days} d`;

  const weeks = now.diff(date, "week");
  if (weeks < 4) return `${weeks} w`;

  const months = now.diff(date, "month");
  if (months < 12) return `${months} mo`;

  return `${now.diff(date, "year")} y`;
};