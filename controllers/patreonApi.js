module.exports.getPosts = (req, res) => {
  const bearerToken = process.env.BEARER_TOKEN;
  const campaignId = process.env.CAMPAIGN_ID;
  const baseUrl = `https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}/posts?fields%5Bpost%5D=title,content,published_at,url,is_public`;

  let allPosts = [];
  let nextCursor = null;

  const fetchPageData = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
        "User-Agent": "State of it All - Website",
      },
    }).then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`Error: ${response.status}`));
      }
      return response.json();
    });

  const fetchPosts = () =>
    new Promise((resolve, reject) => {
      const processNextPage = () => {
        const url = nextCursor
          ? `${baseUrl}&page[cursor]=${nextCursor}`
          : baseUrl;

        fetchPageData(url)
          .then((data) => {
            // clean up content
            const posts = data.data.map((post) => {
              const updatedPost = { ...post };
              if (updatedPost.attributes.content) {
                updatedPost.attributes.content = updatedPost.attributes.content
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
                updatedPost.attributes.content = "";
              }
              return updatedPost;
            });

            allPosts = allPosts.concat(posts);

            nextCursor = data.meta?.pagination?.cursors?.next || null;

            if (!nextCursor) {
              resolve(allPosts);
            } else {
              processNextPage();
            }
          })
          .catch((err) => {
            reject(new Error(`Server error: ${err.message}`));
          });
      };

      processNextPage();
    });

  fetchPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
