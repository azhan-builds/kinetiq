import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Read .env manually if process.env values aren't set
const envPath = path.resolve(process.cwd(), '.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...vals] = trimmed.split('=');
      envVars[key.trim()] = vals.join('=').trim();
    }
  }
}

const projectId = process.env.VITE_SANITY_PROJECT_ID || envVars.VITE_SANITY_PROJECT_ID || 't5do1gu2';
const dataset = process.env.VITE_SANITY_DATASET || envVars.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || envVars.VITE_SANITY_API_VERSION || '2026-03-01';
const token = process.env.SANITY_API_TOKEN || envVars.SANITY_API_TOKEN;

console.log(`Connecting to Sanity project: ${projectId}, dataset: ${dataset}`);

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: token && token !== 'your_sanity_api_token' ? token : undefined,
  useCdn: false,
});

async function run() {
  const docs = await client.fetch(`*[_type == "post"]`);
  console.log(`Found ${docs.length} total post document(s) in Sanity dataset.`);

  let resetCount = 0;
  for (const doc of docs) {
    const bodyType = typeof doc.body;
    const isString = bodyType === 'string';
    console.log(`Doc ID: ${doc._id} | Title: "${doc.title || 'Untitled'}" | body type: ${bodyType}`);

    if (!isString) {
      if (!token || token === 'your_sanity_api_token') {
        console.warn(`[WARN] Document ${doc._id} has body of type "${bodyType}" (non-string), but SANITY_API_TOKEN write token is missing or placeholder.`);
        continue;
      }
      console.log(`Resetting body field to empty string ('') for doc ID: ${doc._id}...`);
      await client.patch(doc._id).set({ body: '' }).commit();
      console.log(`Successfully reset doc ID: ${doc._id}`);
      resetCount++;
    } else {
      console.log(`Doc ID: ${doc._id} already has a valid string body. No change needed.`);
    }
  }

  console.log(`Summary: Processed ${docs.length} document(s). Reset ${resetCount} document(s).`);
}

run().catch((err) => {
  console.error('Error running script:', err);
});
