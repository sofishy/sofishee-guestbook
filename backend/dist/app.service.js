"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let AppService = class AppService {
    supabase;
    constructor() {
        const supabaseUrl = 'https://vllzkanovdgwqcgkajbe.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbHprYW5vdmRnd3FjZ2thamJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTE2ODgsImV4cCI6MjA4NjgyNzY4OH0.eVt75UPZyhg7lr-_gTxSngkOuF1wrEiuEgLtkG7k6Pw';
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
        console.log('✅ Supabase connected');
    }
    async getMessages() {
        try {
            const { data, error } = await this.supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('❌ Error fetching messages:', error);
            return [];
        }
    }
    async addMessage(name, message) {
        try {
            const { data, error } = await this.supabase
                .from('guestbook')
                .insert([{ name, message }])
                .select();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('❌ Error adding message:', error);
            throw error;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map