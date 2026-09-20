export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alimentos_consumidos: {
        Row: {
          calorias: number | null
          cantidad_gramos: number | null
          carbohidratos_g: number | null
          comida_id: string
          grasas_g: number | null
          id: string
          metadatos_extra: Json | null
          nombre: string | null
          proteinas_g: number | null
        }
        Insert: {
          calorias?: number | null
          cantidad_gramos?: number | null
          carbohidratos_g?: number | null
          comida_id: string
          grasas_g?: number | null
          id?: string
          metadatos_extra?: Json | null
          nombre?: string | null
          proteinas_g?: number | null
        }
        Update: {
          calorias?: number | null
          cantidad_gramos?: number | null
          carbohidratos_g?: number | null
          comida_id?: string
          grasas_g?: number | null
          id?: string
          metadatos_extra?: Json | null
          nombre?: string | null
          proteinas_g?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alimentos_consumidos_comida_id_fkey"
            columns: ["comida_id"]
            isOneToOne: false
            referencedRelation: "comidas"
            referencedColumns: ["id"]
          },
        ]
      }
      comidas: {
        Row: {
          id: string
          registro_diario_id: string
          tipo_comida: string | null
        }
        Insert: {
          id?: string
          registro_diario_id: string
          tipo_comida?: string | null
        }
        Update: {
          id?: string
          registro_diario_id?: string
          tipo_comida?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comidas_registro_diario_id_fkey"
            columns: ["registro_diario_id"]
            isOneToOne: false
            referencedRelation: "registros_diarios"
            referencedColumns: ["id"]
          },
        ]
      }
      entrenamientos: {
        Row: {
          duracion_minutos: number | null
          id: string
          nombre: string | null
          registro_diario_id: string
        }
        Insert: {
          duracion_minutos?: number | null
          id?: string
          nombre?: string | null
          registro_diario_id: string
        }
        Update: {
          duracion_minutos?: number | null
          id?: string
          nombre?: string | null
          registro_diario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "entrenamientos_registro_diario_id_fkey"
            columns: ["registro_diario_id"]
            isOneToOne: false
            referencedRelation: "registros_diarios"
            referencedColumns: ["id"]
          },
        ]
      }
      registros_diarios: {
        Row: {
          fecha: string | null
          id: string
          minutos_sueno: number | null
          pasos_totales: number | null
          peso_diario: number | null
          user_id: string | null
        }
        Insert: {
          fecha?: string | null
          id?: string
          minutos_sueno?: number | null
          pasos_totales?: number | null
          peso_diario?: number | null
          user_id?: string | null
        }
        Update: {
          fecha?: string | null
          id?: string
          minutos_sueno?: number | null
          pasos_totales?: number | null
          peso_diario?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      series_entrenamiento: {
        Row: {
          entrenamiento_id: string
          id: string
          nombre_ejercicio: string | null
          orden: number | null
          peso_kg: number | null
          repeticiones: number | null
        }
        Insert: {
          entrenamiento_id: string
          id?: string
          nombre_ejercicio?: string | null
          orden?: number | null
          peso_kg?: number | null
          repeticiones?: number | null
        }
        Update: {
          entrenamiento_id?: string
          id?: string
          nombre_ejercicio?: string | null
          orden?: number | null
          peso_kg?: number | null
          repeticiones?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "series_entrenamiento_entrenamiento_id_fkey"
            columns: ["entrenamiento_id"]
            isOneToOne: false
            referencedRelation: "entrenamientos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
 