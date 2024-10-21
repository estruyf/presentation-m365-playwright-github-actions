import { writeFileSync } from 'fs';

writeFileSync('auth.json', process.env.M365_AUTH_SESSION, 'utf8');