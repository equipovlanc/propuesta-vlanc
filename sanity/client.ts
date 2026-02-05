
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'j14bbmni', 
  dataset: 'production', 
  apiVersion: '2024-06-24', 
  useCdn: true, 
});

export default sanityClient;
