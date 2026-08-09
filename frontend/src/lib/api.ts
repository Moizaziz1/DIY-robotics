const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export interface Tutorial {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  difficulty: string;
  time_estimate?: string;
  cost_estimate?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Video {
  id: number;
  title: string;
  slug: string;
  description?: string;
  youtube_url: string;
  thumbnail_url?: string;
  duration?: string;
  created_at: string;
}

export interface ForumThread {
  id: number;
  title: string;
  content: string;
  author_id: number;
  upvotes: number;
  view_count: number;
  reply_count: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}
