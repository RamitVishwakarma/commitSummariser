import type { CommitView } from '../../commits/commits.service';

export function buildMonthlyPrompt(
  commits: CommitView[],
  periodStart: Date,
  periodEnd: Date,
): string {
  const commitList = commits
    .map((c) => `- [${c.repoName}] ${c.message}`)
    .join('\n');

  const repos = [...new Set(commits.map((c) => c.repoName))];
  const monthName = periodStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return `You are a developer productivity assistant. Analyse the following Git commits from ${monthName} and generate a concise monthly summary.

COMMITS (${commits.length} total):
${commitList || 'No commits this month.'}

Respond with ONLY a valid JSON object matching this exact structure (no markdown, no explanation):
{
  "overview": "2-3 sentence overview of what was achieved this month",
  "projects": ["project/repo focus 1", "project/repo focus 2"],
  "themes": ["main technical theme 1", "main technical theme 2"],
  "totalCommits": ${commits.length},
  "reposActive": ${repos.length},
  "busiestWeek": "Describe which week was busiest and why"
}

Guidelines:
- overview: high-level narrative of the month's work
- projects: main repositories or projects focused on
- themes: recurring technical themes (e.g. "refactoring", "API integration", "testing")
- busiestWeek: rough guess based on commit density
- Be specific and developer-friendly`;
}
