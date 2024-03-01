import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from '../constants/public-access.key';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true)