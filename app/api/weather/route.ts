export async function GET() {
  try {
    const city = "Guangzhou";
    const url = `https://wttr.in/${city}?format=j1`;

    const res = await fetch(url);
    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
