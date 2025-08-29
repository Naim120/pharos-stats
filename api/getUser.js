export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Missing address parameter" });
  }

  try {
    const response = await fetch(`https://api.pharosnetwork.xyz/user/profile?address=${address}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.PHAROS_API_KEY}`,
        "Accept": "application/json",
        "origin": "https://testnet.pharosnetwork.xyz",
        "referer": "https://testnet.pharosnetwork.xyz/"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data from Pharos API" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

