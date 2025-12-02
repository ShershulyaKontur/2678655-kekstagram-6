function isMeetingInWorkHours(startDay, endDay, startMeeting, duration) {
  const startDayMin = getMinutes(startDay);
  const endDayMin = getMinutes(endDay);
  const startMeetingMin = getMinutes(startMeeting);
  const endMeetingMin = startMeetingMin + duration;

  return startMeetingMin >= startDayMin && endMeetingMin <= endDayMin;
}
function getMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}
