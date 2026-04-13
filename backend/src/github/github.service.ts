import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

export interface GithubCommitData {
  hash: string;
  message: string;
  author: string;
  committedAt: Date;
  githubUrl: string;
}

const RATE_LIMIT_THRESHOLD = 10;

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  private createClient(token: string): Octokit {
    return new Octokit({ auth: token });
  }

  async fetchCommitsSince(
    token: string,
    fullName: string,
    since: Date,
  ): Promise<GithubCommitData[]> {
    const [owner, repo] = fullName.split('/');
    if (!owner || !repo) {
      this.logger.warn(`Invalid repo fullName: ${fullName}`);
      return [];
    }

    const client = this.createClient(token);

    try {
      const commits = await client.paginate(
        client.repos.listCommits,
        {
          owner,
          repo,
          since: since.toISOString(),
          per_page: 100,
        },
        (response) => response.data,
      );

      const rateLimit = await client.rateLimit.get();
      const remaining = rateLimit.data.rate.remaining;
      if (remaining < RATE_LIMIT_THRESHOLD) {
        this.logger.warn(
          `GitHub rate limit low: ${remaining} requests remaining for repo ${fullName}`,
        );
      }

      return commits.map((c) => ({
        hash: c.sha,
        message: c.commit.message.split('\n')[0] ?? c.commit.message,
        author: c.commit.author?.name ?? c.commit.committer?.name ?? 'Unknown',
        committedAt: new Date(
          c.commit.author?.date ?? c.commit.committer?.date ?? new Date().toISOString(),
        ),
        githubUrl: c.html_url,
      }));
    } catch (err) {
      this.logger.error(`Failed to fetch commits for ${fullName}: ${String(err)}`);
      throw err;
    }
  }

  async getRepoMetadata(
    token: string,
    fullName: string,
  ): Promise<{ name: string; description: string; language: string; githubUrl: string }> {
    const [owner, repo] = fullName.split('/');
    if (!owner || !repo) throw new Error(`Invalid repo fullName: ${fullName}`);

    const client = this.createClient(token);
    const { data } = await client.repos.get({ owner, repo });

    return {
      name: data.name,
      description: data.description ?? '',
      language: data.language ?? '',
      githubUrl: data.html_url,
    };
  }
}
