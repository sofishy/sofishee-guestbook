export declare class AppService {
    private supabase;
    constructor();
    getMessages(): Promise<any>;
    addMessage(name: string, message: string): Promise<any>;
}
