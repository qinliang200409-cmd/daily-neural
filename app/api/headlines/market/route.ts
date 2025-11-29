export async function GET() {
  try {
    const url = "https://economics.tradingeconomics.com/markets/indices";
    const res = await fetch(url);
    const data = await res.json();

    const major = data.slice(0, 20);

    return Response.json(major);
  } catch (err) {
    return Response.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
