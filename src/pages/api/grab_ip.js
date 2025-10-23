export default async function grab_ip(req, res) {
    if (req.method === 'POST') {
      try {
        const ip = await getIp(req);
        return res.status(200).json({ ip });
      } catch (error) {
        console.error('Error grabbing IP:', error);
        return res.status(500).json({ error: 'Failed to grab IP' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  
  // Helper function to extract the IP address
  async function getIp(req) {
    try {
      let ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || null;
  
      if (typeof ip === 'string') {
        ip = ip.split(',')[0];
        if (ip.startsWith('::ffff:')) {
          ip = ip.substring(7);
        }
      }
      return ip;
    } catch (error) {
      console.error('Error grabbing IP:', error);
      throw error;
    }
  }
  