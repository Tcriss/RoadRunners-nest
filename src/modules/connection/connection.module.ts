import { Module } from '@nestjs/common';
import { ConnectionProvider } from './connection.provider';

@Module({
    imports: [ConnectionProvider],
    exports: [ConnectionProvider]
})
export class ConnectionModule {}
