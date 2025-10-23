import axios from 'axios';
import { load } from 'cheerio';

export default async function Scrape(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    // Fetch the webpage with additional headers
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                      'Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const html = response.data;

    // Use the named export 'load' from cheerio
    const $ = load(html);

    // Extract desired elements, e.g., all paragraphs
    const paragraphs = $('p').map((i, el) => $(el).text().trim()).get();

    // Return the scraped content as JSON
    res.status(200).json({ paragraphs });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
