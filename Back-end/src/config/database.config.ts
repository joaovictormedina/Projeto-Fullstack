import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    'postgresql://plutowtechdb_owner:X5mdGkMWC4tc@ep-morning-grass-a5r80ze5.us-east-2.aws.neon.tech/plutowtechdb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
