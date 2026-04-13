import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Server-side fetch that forwards the session cookie from the incoming request
 * to the NestJS backend. Use this only in Server Components and Route Handlers.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const cookieStore = await cookies();
  const allCookies = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Cookie: allCookies,
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API ${path} returned ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Language colour mapping (GitHub language colours) ───────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HCL: '#844FBA',
  Shell: '#89E051',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Vue: '#41B883',
  Svelte: '#FF3E00',
};

export function langColor(language: string): string {
  return LANG_COLORS[language] ?? '#8B8B8B';
}

// ─── API response types (backend shapes) ─────────────────────────────────────

export interface ApiRepository {
  _id: string;
  id?: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  githubUrl: string;
  isActive: boolean;
  lastSynced: string | null;
  totalCommits: number;
  createdAt: string;
}

export interface ApiCommit {
  id: string;
  repoId: string;
  repoName: string;
  hash: string;
  message: string;
  author: string;
  committedAt: string;
  githubUrl: string;
  isFlagged: boolean;
  isDeleted: boolean;
  status: 'clean' | 'flagged' | 'deleted';
}

export interface ApiSummary {
  _id: string;
  type: 'weekly' | 'monthly' | 'yearly';
  periodStart: string;
  periodEnd: string;
  content: Record<string, unknown>;
  modelUsed: string;
  generatedAt: string;
}

export interface ApiDashboardStats {
  reposTracked: number;
  commitsThisWeek: number;
  commitsLastWeek: number;
  summariesGenerated: number;
  lastSyncDate: string | null;
}

export interface ApiSettings {
  githubToken: string;
  githubUsername: string;
  githubUserId: string;
  trackedRepos: string[];
  llm: {
    provider: string;
    apiKey: string;
    model: string;
    customPrompt: string;
  };
  lastSyncDate: string | null;
  weeklySummaryDay: string;
  monthlySummaryDayOfMonth: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
