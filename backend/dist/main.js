"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'https://fictional-space-zebra-5g46gw9x9q4p24pj5-5173.app.github.dev',
            'http://localhost:5173',
            'http://localhost:3000'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    await app.listen(3000);
    console.log('✅ Backend started on port 3000');
}
bootstrap();
//# sourceMappingURL=main.js.map