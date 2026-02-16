import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase;

  constructor() {
    const supabaseUrl = 'https://vllzkanovdgwqcgkajbe.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbHprYW5vdmRnd3FjZ2thamJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTE2ODgsImV4cCI6MjA4NjgyNzY4OH0.eVt75UPZyhg7lr-_gTxSngkOuF1wrEiuEgLtkG7k6Pw';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected');
  }

  async getMessages() {
    try {
      const { data, error } = await this.supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ Error fetching messages:', error);
      return [];
    }
  }

  async addMessage(name: string, message: string) {
    try {
      const { data, error } = await this.supabase
        .from('guestbook')
        .insert([{ name, message }])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('❌ Error adding message:', error);
      throw error;
    }
  }
}