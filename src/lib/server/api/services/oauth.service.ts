import { inject, injectable } from "tsyringe";
import { TokensService } from "./tokens.service";
import { LuciaProvider } from "../providers/lucia.provider";
import { UsersRepository } from "../repositories/users.repository";
import { HashingService } from "./hashing.service";
import { config } from "../common/config";
import {
  generateCodeVerifier,
  generateState,
  Google,
  OAuth2RequestError,
  type GoogleTokens,
} from "arctic";
import type {
  GoogleAuthInfo,
  Provider,
  UserInfo,
} from "../interfaces/oauth.intefrace";
import { OAuthRepository } from "../repositories/oauth.repository";
import { getCookie } from "hono/cookie";
import type { Context } from "hono";
import type { Session } from "lucia";

@injectable()
export class OAuthService {
  public google: Google;

  constructor(
    @inject(LuciaProvider) private readonly lucia: LuciaProvider,
    @inject(TokensService) private readonly tokensService: TokensService,
    @inject(UsersRepository) private readonly usersRepository: UsersRepository,
    @inject(HashingService) private readonly hashingService: HashingService,
    @inject(OAuthRepository) private readonly oAuthRepository: OAuthRepository,
  ) {
    this.google = new Google(
      process.env.GOOGLE_CLIENT_ID ?? "",
      process.env.GOOGLE_CLIENT_SECRET ?? "",
      `${config.ORIGIN}/api/auth/login/google/callback`,
    );
  }

  async checkForExistingUser(userInfo: UserInfo) {
    return await this.oAuthRepository.findValidRecord(userInfo);
  }

  async createAccount(userInfo: UserInfo) {
    //create user
    const newUser = await this.usersRepository.create({
      name: userInfo.name,
      surname: userInfo.surname,
      email: userInfo.surname,
      password: "",
    });

    //create OAuth account
    const newAccount = this.oAuthRepository.create({
      userId: newUser.id,
      providerId: userInfo.provider,
      providerUserId: userInfo.id,
    });

    return newUser;
  }

  async authAccount(userInfo: UserInfo) {
    const existingUser = await this.checkForExistingUser(userInfo);

    if (existingUser) {
      return await this.lucia.createSession(existingUser.users.id, {});
    }

    const newAccount = await this.createAccount(userInfo);

    return await this.lucia.createSession(newAccount.id, {});
  }

  validateAuthorizationCode(
    code: string,
    codeVerifier?: string,
  ): Promise<GoogleTokens> {
    return this.google.validateAuthorizationCode(code, codeVerifier!);
  }

  async handleOAuth2Callback(
    ctx: Context,
    provider: Provider,
    fetchUserInfo: (accessToken: string) => Promise<UserInfo>,
  ): Promise<{ session: Session | null; error: string | null }> {
    const code = ctx.req.query("code");
    const state = ctx.req.query("state");
    const storedState = getCookie(ctx, `${provider}_oauth_state`);

    if (!code || !state || !storedState || state !== storedState) {
      return { session: null, error: "code-incorrect-or-expired" };
    }

    try {
      const tokens = await this.validateAuthorizationCode(code, provider);

      const userInfoResponse = await fetchUserInfo(tokens.accessToken);
      const session = await this.authAccount(userInfoResponse);
      if ("error" in session) return { session: session, error: "" };

      return { session, error: "" };
    } catch (error) {
      if (error instanceof OAuth2RequestError) {
        return { session: null, error: error.description };
      }
      return { session: null, error: "error" };
    }
  }

  async getGoogleAuthorizationInfo(): Promise<GoogleAuthInfo> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = (
      await this.google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
      })
    ).toString();

    return {
      state,
      codeVerifier,
      url,
    };
  }
}
