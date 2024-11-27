async function convert(base: any, destination: any) {
  try {
    const result: any = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${base}`
    );
    const data: any = await result.json();
    return data.rates[destination];
  } catch (e) {
    return null;
  }
}

export { convert };