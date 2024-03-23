import { SetMetadata } from "@nestjs/common";

import { PUBLIC_KEY } from "../constans/public-access.key";

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true)