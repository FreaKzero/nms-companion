import https from 'https';

export interface redditFeed {
  title: string;
  author: string;
  link: string;
  published: Date;
  content: string;
  imageUrl?: string;
  isNew: boolean;
}

function decodeHtmlEntities (str: string): string {
  if (!str) return '';

  return str.replace(/&(#?[\w\d]+);/g, (_, entity) => {
    switch (entity) {
      case 'amp': return '&';
      case 'lt': return '<';
      case 'gt': return '>';
      case 'quot': return '"';
      case '#39': return "'";
      default:

        if (entity.startsWith('#')) {
          const code = parseInt(entity.substring(1), 10);
          if (!isNaN(code)) return String.fromCharCode(code);
        }
        return '&' + entity + ';';
    }
  });
}

export function fetchReddit (subreddit = 'all', search?: string): Promise<string> {
  const url = search
    ? `https://www.reddit.com/r/${subreddit}/search.rss?q=${search}&restrict_sr=1&sort=new`
    : `https://www.reddit.com/r/${subreddit}/.rss`;

  const options = { headers: { 'User-Agent': 'nms-log/1.0' } };

  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

export function purify (raw: string): string {
  raw = raw.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, '');
  raw = raw.replace('submitted by', '');
  raw = raw.replace(/<[^>]+>/g, '');
  raw = raw.replace(/&#32;/g, '');
  raw = raw.replace(/\s+/g, ' ').trim();
  return raw;
}

export function parseRSS (xml: string, lastRead?: Date) {
  const entries = xml.split(/<\/entry>/).slice(0, -1);

  return entries.map((e: string): redditFeed => {
    let content = (e.match(/<content[^>]*>([\s\S]*?)<\/content>/) || [])[1] || '';
    content = content.replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1');
    content = decodeHtmlEntities(content);

    const imgMatch = content.match(/<img[^>]+src="(https:\/\/b\.thumbs\.redditmedia\.com\/[^"?]+)"/i);
    const imageUrl = imgMatch ? imgMatch[1] : undefined;

    const published = new Date((e.match(/<updated>([^<]+)<\/updated>/) || [])[1] || '');

    return {
      title: decodeHtmlEntities((e.match(/<title[^>]*>([^<]+)<\/title>/) || [])[1] || ''),
      author: (e.match(/<name>([^<]+)<\/name>/) || [])[1] || '',
      link: (e.match(/<link[^>]*href="([^"]+)"/) || [])[1] || '',
      published,
      content: purify(content),
      isNew: lastRead ? published.getTime() > lastRead.getTime() : false,
      imageUrl
    };
  });
}
