const tokenizedTextToCSV = (text) => {
  const bestellnr = text.items
    .slice(18, 37)
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');
  const rechnungsDatum = text.items
    .slice(106, 125)
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');
  const rechnungsBetragBrutto = text.items
    .slice(180, 181)
    .map((s) => {
      return s.str;
    })
    .join('')
    .replace(/ /g, '');

  return {
    Bestellnr: bestellnr,
    buffer1: '',
    buffer2: '',
    Rechnungs_Datum: rechnungsDatum,
    Rechnungsbetrag_Brutto: rechnungsBetragBrutto
  };
};

export default tokenizedTextToCSV;
