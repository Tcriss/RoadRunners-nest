import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";

import { AuthStrategy } from "./auth.strategy";
import { configServiceMock } from "../../../common/domain/mocks";

describe('AuthStrategy', () => {
    let authStrategy: AuthStrategy;
    let config: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthStrategy,
                {
                    provide: ConfigService,
                    useValue: configServiceMock
                }
            ]
        }).compile();

        authStrategy = module.get<AuthStrategy>(AuthStrategy);
        config = module.get<ConfigService>(ConfigService);
    });

    it('should be define', () => {
        expect(authStrategy).toBeDefined();
        expect(config).toBeDefined();
    });
})