
export function formatDateLabel(dateStr: string | Date) {
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

// Generate 7 days: 3 past, current, 3 future
export function generate7Days(centerData: any): any[] {
  const today = new Date();
  const days: any[] = [];

  // Generate 3 past days
  for (let i = 3; i >= 1; i--) {
    debugger
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const tempVariation = Math.floor(Math.random() * 6 - 3); 
    days.push({
      date: dateStr,
      temp: centerData.temp + tempVariation,
      condition: centerData.condition,
      icon: centerData.icon,
    });
  }

  // Add current day (today)
  const todayStr = today.toISOString().split('T')[0];
  days.push({
    date: todayStr,
    temp: centerData.temp,
    condition: centerData.condition,
    icon: centerData.icon,
  });

  // Generate 3 future days
  for (let i = 1; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const tempVariation = Math.floor(Math.random() * 6 - 3);
    days.push({
      date: dateStr,
      temp: centerData.temp + tempVariation,
      condition: centerData.condition,
      icon: centerData.icon,
    });
  }

  return days;
}
