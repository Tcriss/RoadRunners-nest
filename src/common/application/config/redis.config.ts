import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export const redisConfig = async (config: ConfigService): Promise<any> => ({
  ttl: (60 ^ 2) * 1000,
  store: await redisStore({
    socket: {
      host: config.get<string>('REDIS_HOST'),
      port: +config.get<number>('REDIS_PORT')
    }
  })
})