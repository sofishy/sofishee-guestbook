import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase;

  constructor() {
    // Use your NEW Supabase URL and anon key
    const supabaseUrl = 'https://vllzkanovdgwqcgkajbe.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsbHprYW5vdmRnd3FjZ2thamJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTE2ODgsImV4cCI6MjA4NjgyNzY4OH0.eVt75UPZyhg7lr-_gTxSngkOuF1wrEiuEgLtkG7k6Pw';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected with new project!');
  }

  async getMessages() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    return data || [];
  }

  async addMessage(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    return data;
  }
}