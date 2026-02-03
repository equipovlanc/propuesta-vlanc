import { createClient } from '@sanity/client';

const sanityClient = createClient({
  // --- IMPORTANT ---
  // Replace 'your-project-id' with your actual Sanity project ID
  // You can find it at manage.sanity.io
  projectId: 'your-project-id', 
  dataset: 'production', 
  
  apiVersion: '2024-06-24', // use a UTC date in YYYY-MM-DD format
  useCdn: true, // `false` if you want to ensure fresh data
});

export default sanityClient;
