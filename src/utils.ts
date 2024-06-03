export function getImageURL(path: string): string {
  return new URL(`/assets/${path}`, import.meta.url).href;
}

export function capitaliseString(input: string): string {
  return input.slice(0, 1).toUpperCase() + input.slice(1);
}

function convertYearToBcOrNot(year: number): string {
  if (String(year)[0] === "-") return String(year).slice(1) + " BC";
  else return String(year);
}

export function getDateRangeString(startYear: number, endYear: number): string {
  if (startYear === endYear) return convertYearToBcOrNot(startYear);
  else
    return `${convertYearToBcOrNot(startYear)}-${convertYearToBcOrNot(
      endYear
    )}`;
}
