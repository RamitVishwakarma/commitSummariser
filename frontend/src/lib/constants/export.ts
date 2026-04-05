export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface MockRow {
  hash: string;
  repo: string;
  message: string;
  date: string;
}

export const MOCK_ROWS: MockRow[] = [
  { hash: "a3f7b2c", repo: "gitpulse", message: "feat: add glassmorphism theme", date: "2026-04-04" },
  { hash: "e9d1f4a", repo: "gitpulse", message: "fix: sidebar animation timing", date: "2026-04-04" },
  { hash: "7f2a9c1", repo: "api-gateway", message: "feat: JWT refresh rotation", date: "2026-04-04" },
  { hash: "f3a8c2e", repo: "ml-pipeline", message: "feat: BERT fine-tuning script", date: "2026-04-03" },
  { hash: "9a1c4f7", repo: "infra-terraform", message: "feat: RDS read replica", date: "2026-04-02" },
];
