export async function GET() {
  try {
    const url =
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml";

    const res = await fetch(url);
    const data = await res.json();

    return Response.json(data.items || []);
  } catch (err) {
    return Response.json({ error: "Failed to fetch tech news" }, { status: 500 });
  }
}
