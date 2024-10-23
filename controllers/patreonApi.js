const axios = require("axios");

module.exports.getPosts = async (req, res) => {
  const bearerToken = process.env.BEARER_TOKEN;
  const campaignId = process.env.CAMPAIGN_ID;
  const baseUrl = `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/posts?fields%5Bpost%5D=title,content,published_at,url,is_public`;
  console.log("Received request for patreon Posts");

  let allPosts = [];
  let nextCursor = null;

  try {
    do {
      const url = nextCursor
        ? `${baseUrl}&page[cursor]=${nextCursor}`
        : baseUrl;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "User-Agent": "State of it All - Website",
        },
      });

      response.data.data.forEach((post) => {
        if (post.attributes.content) {
          // posts are recieved as html and this is to clean them for safety
          post.attributes.content = post.attributes.content
            .replace(/<script[^>]*>(.*?)<\/script>/gs, "")
            .replace(/<iframe[^>]*>(.*?)<\/iframe>/gs, "")
            .replace(/<object[^>]*>(.*?)<\/object>/gs, "")
            .replace(/<embed[^>]*>(.*?)<\/embed>/gs, "")
            .replace(/<form[^>]*>(.*?)<\/form>/gs, "")
            .replace(/<input[^>]*>/gs, "")
            .replace(/<em>/g, "")
            .replace(/<\/em>/g, "")
            .replace(/<strong>/g, "")
            .replace(/<\/strong>/g, "")
            .replace(/<p[^>]*>/g, " ")
            .replace(/<\/p>/g, " ")
            .replace(/<br\s*\/?>/g, " ")
            .replace(/&amp;/g, "&");
        } else {
          post.attributes.content = "";
        }
      });

      allPosts = allPosts.concat(response.data.data);
      nextCursor = response.data.meta?.pagination?.cursors?.next || null;
    } while (nextCursor);

    res.json(allPosts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
