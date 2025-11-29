export async function GET() {
  try {
    const url =
      "https://gnews.io/api/v4/top-headlines?category=general&lang=zh&country=cn&apikey=demo";

    const res = await fetch(url);
    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch headlines" }, { status: 500 });
  }
}
