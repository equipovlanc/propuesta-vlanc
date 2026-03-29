
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'j14bbmni', 
  dataset: 'production', 
  apiVersion: '2024-06-24', 
  useCdn: true, 
});

async function main() {
  try {
    const slugs = await client.fetch('*[_type == "proposal"]{ "slug": slug.current }');
    console.log(JSON.stringify(slugs, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();
