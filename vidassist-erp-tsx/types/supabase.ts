export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          categoryID: string
          created_at: string
          description: string
          id: string
          title: string
          userId: string
        }
        Insert: {
          categoryID: string
          created_at?: string
          description: string
          id?: string
          title: string
          userId: string
        }
        Update: {
          categoryID?: string
          created_at?: string
          description?: string
          id?: string
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_categoryID_fkey"
            columns: ["categoryID"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      permissions: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rating_criteria: {
        Row: {
          created_at: string
          createdBy: string
          description: string
          id: string
          name: string
          position: number
          rating_scale_id: string
          rating_schema_id: string
        }
        Insert: {
          created_at?: string
          createdBy: string
          description: string
          id?: string
          name: string
          position: number
          rating_scale_id: string
          rating_schema_id: string
        }
        Update: {
          created_at?: string
          createdBy?: string
          description?: string
          id?: string
          name?: string
          position?: number
          rating_scale_id?: string
          rating_schema_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rating_criteria_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_criteria_rating_scale_id_fkey"
            columns: ["rating_scale_id"]
            isOneToOne: false
            referencedRelation: "rating_scale"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_criteria_rating_schema_id_fkey"
            columns: ["rating_schema_id"]
            isOneToOne: false
            referencedRelation: "rating_schema"
            referencedColumns: ["id"]
          }
        ]
      }
      rating_scale: {
        Row: {
          created_at: string
          id: string
          max_value: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_value: number
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          max_value?: number
          name?: string
        }
        Relationships: []
      }
      rating_schema: {
        Row: {
          categoryId: string
          created_at: string
          createdBy: string
          id: string
          title: string
        }
        Insert: {
          categoryId: string
          created_at?: string
          createdBy: string
          id?: string
          title: string
        }
        Update: {
          categoryId?: string
          created_at?: string
          createdBy?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "rating_schema_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_schema_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          courseId: string
          created_at: string
          id: string
          rating_value: number
          userId: string
        }
        Insert: {
          comment?: string | null
          courseId: string
          created_at?: string
          id?: string
          rating_value: number
          userId: string
        }
        Update: {
          comment?: string | null
          courseId?: string
          created_at?: string
          id?: string
          rating_value?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          assetId: string
          courseId: string
          created_at: string
          createdBy: string
          id: string
          playbackId: string
        }
        Insert: {
          assetId: string
          courseId: string
          created_at?: string
          createdBy: string
          id?: string
          playbackId: string
        }
        Update: {
          assetId?: string
          courseId?: string
          created_at?: string
          createdBy?: string
          id?: string
          playbackId?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_createdBy_fkey"
            columns: ["createdBy"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
