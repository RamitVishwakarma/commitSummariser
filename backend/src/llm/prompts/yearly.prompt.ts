import type { CommitView } from '../../commits/commits.service';

export function buildYearlyPrompt(
  commits: CommitView[],
  periodStart: Date,
  _periodEnd: Date,
): string {
  const year = periodStart.getFullYear();
  const repos = [...new Set(commits.map((c) => c.repoName))];

  const commitsByRepo = repos.map((repo) => {
    const repoCommits = commits.filter((c) => c.repoName === repo);
    return `${repo}: ${repoCommits.length} commits`;
  });

  const sampleMessages = commits
    .slice(0, 50)
    .map((c) => `- [${c.repoName}] ${c.message}`)
    .join('\n');

  return `You are a developer productivity assistant. Analyse the following Git activity for the year ${year} and generate a comprehensive yearly review.

REPOSITORIES (${repos.length} active):
${commitsByRepo.join('\n')}

SAMPLE COMMITS (first 50 of ${commits.length} total):
${sampleMessages || 'No commits this year.'}

Respond with ONLY a valid JSON object matching this exact structure (no markdown, no explanation):
{
  "narrative": "3-4 sentence narrative of the year's engineering journey and growth",
  "totalCommits": ${commits.length},
  "reposActive": ${repos.length},
  "weeksSummarised": 52,
  "longestStreak": 0,
  "skills": {
    "TypeScript": 0,
    "System Design": 0,
    "Testing": 0,
    "DevOps": 0,
    "API Development": 0
  }
}

Guidelines:
- narrative: reflect on themes, growth, major milestones of the year
- skills: rate each skill 1-10 based on commit evidence (0 = no evidence, 10 = dominant focus)
- Add or remove skill keys based on what the commits actually show
- Be reflective and developer-authentic`;
}
