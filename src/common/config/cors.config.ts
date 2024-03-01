import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsConfig: CorsOptions = {
    origin: [process.env.DEV_HOST, process.env.PROD_HOST],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true
}