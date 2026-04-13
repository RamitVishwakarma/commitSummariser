import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import type { GithubUser } from './strategies/github.strategy';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: GithubUser,
    done: (err: Error | null, id: GithubUser) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(
    payload: GithubUser,
    done: (err: Error | null, user: GithubUser) => void,
  ): void {
    done(null, payload);
  }
}
