import type { CommitView } from '../../commits/commits.service';

export function buildWeeklyPrompt(
  commits: CommitView[],
  periodStart: Date,
  periodEnd: Date,
): string {
  const commitList = commits
    .map((c) => `- [${c.repoName}] ${c.message} (${c.author})`)
    .join('\n');

  const repos = [...new Set(commits.map((c) => c.repoName))].join(', ');
  const startStr = periodStart.toDateString();
  const endStr = periodEnd.toDateString();

  return `You are a developer productivity assistant. Analyse the following Git commits from the week of ${startStr} to ${endStr} and generate a concise weekly summary.

COMMITS (${commits.length} total across repos: ${repos}):
${commitList || 'No commits this week.'}

Respond with ONLY a valid JSON object matching this exact structure (no markdown, no explanation):
{
  "accomplishments": ["short bullet describing key work done", "another key accomplishment"],
  "reposActive": ["repo1", "repo2"],
  "commitsProcessed": ${commits.length},
  "notable": "One sentence highlighting the most notable or impactful work this week."
}

Guidelines:
- accomplishments: 2-5 concise bullets describing meaningful work (group related commits)
- reposActive: list of unique repos that had commits
- notable: pick the most significant change or theme
- Be specific, use developer language, avoid filler phrases`;
}
