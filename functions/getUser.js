export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const address = url.searchParams.get("address");

  if (!address) {
    return new Response(JSON.stringify({ error: "Missing address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const API_URL = "https://api.pharosnetwork.xyz/user/profile";
  const BEARER_TOKEN = env.PHAROS_BEARER; // Stored in Cloudflare secrets

  try {
    const resp = await fetch(`${API_URL}?address=${address}`, {
      headers: {
        "Authorization": `Bearer ${BEARER_TOKEN}`,
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://testnet.pharosnetwork.xyz/",
        "Origin": "https://testnet.pharosnetwork.xyz",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
