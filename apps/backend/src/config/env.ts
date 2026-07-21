import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(8080),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  STELLAR_NETWORK: z.enum(["testnet", "mainnet"]).default("testnet"),

  SEP10_SERVER_SECRET: z.string().optional(),
  SEP10_HOME_DOMAIN: z.string().default("lingualayer.vercel.app"),
  SEP10_WEB_AUTH_DOMAIN: z.string().optional(),
  SEP10_CHALLENGE_TIMEOUT_SECONDS: z.coerce.number().default(300),

  JWT_SECRET: z.string().optional(),
  JWT_TTL_SECONDS: z.coerce.number().default(3600),

  // QualityOracle curator leaderboard
  SOROBAN_RPC_URL: z.string().default("https://soroban-testnet.stellar.org"),
  QUALITY_ORACLE_CONTRACT_ID: z.string().optional(),
  LEADERBOARD_CACHE_TTL_MS: z.coerce.number().default(30_000),
});

const raw = schema.parse(process.env);

export const config = {
  nodeEnv: raw.NODE_ENV,
  port: raw.PORT,
  apiPrefix: raw.API_PREFIX,
  corsOrigin: raw.CORS_ORIGIN,

  stellarNetwork: raw.STELLAR_NETWORK,

  sep10ServerSecret: raw.SEP10_SERVER_SECRET,
  sep10HomeDomain: raw.SEP10_HOME_DOMAIN,
  sep10WebAuthDomain: raw.SEP10_WEB_AUTH_DOMAIN ?? raw.SEP10_HOME_DOMAIN,
  sep10ChallengeTimeoutSeconds: raw.SEP10_CHALLENGE_TIMEOUT_SECONDS,

  jwtSecret: raw.JWT_SECRET,
  jwtTtlSeconds: raw.JWT_TTL_SECONDS,

  sorobanRpcUrl: raw.SOROBAN_RPC_URL,
  qualityOracleContractId: raw.QUALITY_ORACLE_CONTRACT_ID,
  leaderboardCacheTtlMs: raw.LEADERBOARD_CACHE_TTL_MS,
};
