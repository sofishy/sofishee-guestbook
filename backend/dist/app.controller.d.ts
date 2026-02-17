import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getMessages(): Promise<any>;
    addMessage(body: {
        name: string;
        message: string;
    }): Promise<any>;
    healthCheck(): {
        status: string;
        message: string;
        timestamp: string;
    };
}
