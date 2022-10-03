const parseJson = (json: any) => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return JSON.parse(json);
};

const formatNumber = (
  value: string,
  decimalPoints = 0,
  currency = '$'
): string => {
  let formattedNumber = '';
  if ((value || value == '0') && decimalPoints > 0) {
    formattedNumber =
      currency +
      parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  } else if ((value || value == '0') && decimalPoints == 0) {
    // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let lastThree = value.toString().substring(value.length - 3);
    const otherNumbers = value.toString().substring(0, value.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    formattedNumber =
      currency + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  } else {
    formattedNumber = currency + '0.00';
  }

  if (formattedNumber.includes('-')) {
    return '-' + formattedNumber.replace('-', '');
  }

  return formattedNumber;
};

const truncateText = (value: string, limit: string | number): string => {
  if (value) {
    return value.length > limit
      ? `${value.substring(0, Number(limit) - 3)}...`
      : value;
  }
  return '';
};

const titleCase = (
  value: string,
  removeSpecialChar = false,
  specialChar = '_'
): string => {
  if (value) {
    const titleString = value.charAt(0).toUpperCase() + value.slice(1);

    return removeSpecialChar
      ? titleString.replace(new RegExp(specialChar, 'gi'), ' ')
      : titleString;
  }
  return '';
};

const convertToCSV = (
  fileName: string,
  data: string,
  type = 'text/csv;charset=utf-8;',
  extension = '.csv'
): void => {
  const exportedFilename = `${fileName}${new Date()
    .toISOString()
    .slice(0, 10)}${extension}`;
  const blob = new Blob([data], { type });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', exportedFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const timeInterval = (
  callback: () => void,
  interval = 500
): typeof clearTimeout => {
  let counter = 1;
  let timeoutId: NodeJS.Timeout;
  const startTime = Date.now();

  function main() {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutId = setTimeout(main, interval - (nowTime - nextTime));
    counter += 1;
    callback();
  }

  timeoutId = setTimeout(main, interval);

  return () => {
    clearTimeout(timeoutId);
  };
};

export {
  formatNumber,
  parseJson,
  truncateText,
  titleCase,
  convertToCSV,
  timeInterval
};
