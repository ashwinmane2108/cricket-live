// Keeps your API key private. Set CRICKET_API_KEY in Netlify > Site settings > Environment variables.
exports.handler = async () => {
  const key = process.env.CRICKET_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: "Missing CRICKET_API_KEY" }) };
  try {
    const r = await fetch("https://api.cricapi.com/v1/currentMatches?offset=0&apikey=" + encodeURIComponent(key));
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=0, s-maxage=45" },
      body: await r.text()
    };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: "Upstream failed" }) };
  }
};
