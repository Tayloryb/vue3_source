class CustomDate extends Date {
  format(formatStr: string): string {
    console.log('this :>> ', this);
    let formattedDate = '';

    if (formatStr.includes('Y')) formattedDate += this.getFullYear() + '-';
    if (formatStr.includes('M')) formattedDate += (this.getMonth() + 1).toString().padStart(2, '0') + '-';
    if (formatStr.includes('D')) formattedDate += this.getDate().toString().padStart(2, '0') + ' ';
    if (formatStr.includes('h')) formattedDate += this.getHours().toString().padStart(2, '0') + ':';
    if (formatStr.includes('m')) formattedDate += this.getMinutes().toString().padStart(2, '0') + ':';
    if (formatStr.includes('s')) formattedDate += this.getSeconds().toString().padStart(2, '0');

    return formattedDate.trim();
  }
}

export const utcToLocal = (utcTime: string | number, timeZone?: string): CustomDate => {
  // 创建一个新的 CustomDate 对象，使用 UTC 时间
  const date = new CustomDate(utcTime);

  // 获取用户的时区偏移（以分钟为单位）
  let timezoneOffset = date.getTimezoneOffset() * 60 * 1000;

  // 如果传入了时区名称，那么计算时区偏移
  if (timeZone) {
    const dateInTimezone = new Date((new Date(utcTime)).toLocaleString('en-US', { timeZone }));
    timezoneOffset = dateInTimezone.getTime() - date.getTime();
  }

  // 创建一个新的 CustomDate 对象，考虑到时区偏移
  const localDate = new CustomDate(date.getTime() + timezoneOffset);

  return localDate;
}