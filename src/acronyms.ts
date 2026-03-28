const acronyms: Record<number, string> = {
  1: 'TSB',
  2: 'TCI',
  3: 'SYS',
  4: 'LAG',
  5: 'IOU',
  6: 'GRN',
  7: 'THS',
  8: 'YAZ',
  9: 'TCT',
  10: 'CNC',
  11: 'MSG',
  12: 'TMI',
  13: 'TCP',
  14: 'IIL',
  15: 'FHG',
  16: 'SYM',
  17: 'LSC',
  18: 'PRN',
  19: 'EWM',
  20: 'TCM',
  21: 'ELT',
  22: 'HRG',
  23: 'TGP',
  24: 'MUN',
  25: 'WSU',
  26: 'IST',
  27: 'BAG',
  28: 'EVL',
  29: 'MCS',
  30: 'WLT',
  31: 'TCC',
  32: 'ASS',
  33: 'CBD',
  34: 'LOS',
  35: 'PTS',
}

export function getAcronym(stockId: number) {
  // TODO error handling if does not exist
  // TODO possible api integration
  return acronyms[stockId]
}
