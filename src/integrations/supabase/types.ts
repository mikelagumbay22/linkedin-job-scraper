export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      address_documents: {
        Row: {
          address_id: string
          document_id: string
        }
        Insert: {
          address_id: string
          document_id: string
        }
        Update: {
          address_id?: string
          document_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_documents_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      address_user: {
        Row: {
          address_id: string
          status: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          address_id: string
          status?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          address_id?: string
          status?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_user_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      address_vehicle: {
        Row: {
          address_id: string
          vehicle_id: string
        }
        Insert: {
          address_id: string
          vehicle_id: string
        }
        Update: {
          address_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_vehicle_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_vehicle_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      address_worker: {
        Row: {
          address_id: string
          worker_id: string
        }
        Insert: {
          address_id: string
          worker_id: string
        }
        Update: {
          address_id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "address_worker_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "address_worker_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      addresses: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          postal_code: string | null
          state: string | null
          street: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          postal_code?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          postal_code?: string | null
          state?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          author_id: string | null
          body: string
          created_at: string | null
          deleted_at: string | null
          id: string
          images: Json | null
          title: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          images?: Json | null
          title?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          images?: Json | null
          title?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          author_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          parent_category_id: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_category_id?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_category_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cbm_rates: {
        Row: {
          author_id: string
          billing_month: string
          created_at: string
          deleted_at: string | null
          excess_water_distribution_loss_over_mwci_maximum_price: string
          excess_water_distribution_loss_over_mwci_maximum_price_percent: string
          id: string
          markup_allowance_for_pricing_recovery_percent: string
          markup_amount_of_total_cbm: string
          markup_rate_of_total_cbm: string
          meralco_bill_amount: string
          meralco_billing_date: string
          meralco_consumption_total: string
          meralco_rate_per_cbm_cons: string
          meralco_rate_per_cbm_cons_percent: string
          mr_monthly_standard_amount: string
          mr_rate_per_cbm_cons: string
          mr_rate_per_cbm_cons_percent: string
          mwci_consumption_total_amount: string
          mwci_consumption_total_cbm: string
          mwci_total_amount_per_total_cbm: string
          period_covered: string
          prehai_total_amount: string
          prehai_total_cbm: string
          residents_total_amount: string
          residents_total_cbm: string
          status: string | null
          subsidized_total_amount: string
          subsidized_total_cbm: string
          total_adjusted_billing_amount: string
          total_adjusted_billing_rate: string
          total_markup_amount: string
          total_markup_rate: string
          updated_at: string
          water_distribution_loss: string
          water_distribution_loss_percent: string
          water_loss_amount: string
          water_loss_cbm: string
        }
        Insert: {
          author_id: string
          billing_month?: string
          created_at?: string
          deleted_at?: string | null
          excess_water_distribution_loss_over_mwci_maximum_price: string
          excess_water_distribution_loss_over_mwci_maximum_price_percent: string
          id?: string
          markup_allowance_for_pricing_recovery_percent: string
          markup_amount_of_total_cbm: string
          markup_rate_of_total_cbm: string
          meralco_bill_amount: string
          meralco_billing_date?: string
          meralco_consumption_total: string
          meralco_rate_per_cbm_cons: string
          meralco_rate_per_cbm_cons_percent: string
          mr_monthly_standard_amount: string
          mr_rate_per_cbm_cons: string
          mr_rate_per_cbm_cons_percent: string
          mwci_consumption_total_amount: string
          mwci_consumption_total_cbm: string
          mwci_total_amount_per_total_cbm: string
          period_covered: string
          prehai_total_amount: string
          prehai_total_cbm: string
          residents_total_amount: string
          residents_total_cbm: string
          status?: string | null
          subsidized_total_amount: string
          subsidized_total_cbm: string
          total_adjusted_billing_amount: string
          total_adjusted_billing_rate: string
          total_markup_amount: string
          total_markup_rate: string
          updated_at?: string
          water_distribution_loss: string
          water_distribution_loss_percent: string
          water_loss_amount: string
          water_loss_cbm: string
        }
        Update: {
          author_id?: string
          billing_month?: string
          created_at?: string
          deleted_at?: string | null
          excess_water_distribution_loss_over_mwci_maximum_price?: string
          excess_water_distribution_loss_over_mwci_maximum_price_percent?: string
          id?: string
          markup_allowance_for_pricing_recovery_percent?: string
          markup_amount_of_total_cbm?: string
          markup_rate_of_total_cbm?: string
          meralco_bill_amount?: string
          meralco_billing_date?: string
          meralco_consumption_total?: string
          meralco_rate_per_cbm_cons?: string
          meralco_rate_per_cbm_cons_percent?: string
          mr_monthly_standard_amount?: string
          mr_rate_per_cbm_cons?: string
          mr_rate_per_cbm_cons_percent?: string
          mwci_consumption_total_amount?: string
          mwci_consumption_total_cbm?: string
          mwci_total_amount_per_total_cbm?: string
          period_covered?: string
          prehai_total_amount?: string
          prehai_total_cbm?: string
          residents_total_amount?: string
          residents_total_cbm?: string
          status?: string | null
          subsidized_total_amount?: string
          subsidized_total_cbm?: string
          total_adjusted_billing_amount?: string
          total_adjusted_billing_rate?: string
          total_markup_amount?: string
          total_markup_rate?: string
          updated_at?: string
          water_distribution_loss?: string
          water_distribution_loss_percent?: string
          water_loss_amount?: string
          water_loss_cbm?: string
        }
        Relationships: []
      }
      delivery_pass: {
        Row: {
          company_name: string
          created_at: string | null
          deleted_at: string | null
          delivery_details: string | null
          id: string
          photo: string | null
          plate_number: string | null
          status: string | null
          updated_at: string | null
          users_id: string
          vehicle_type: string | null
          visit_date: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          deleted_at?: string | null
          delivery_details?: string | null
          id?: string
          photo?: string | null
          plate_number?: string | null
          status?: string | null
          updated_at?: string | null
          users_id: string
          vehicle_type?: string | null
          visit_date: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          deleted_at?: string | null
          delivery_details?: string | null
          id?: string
          photo?: string | null
          plate_number?: string | null
          status?: string | null
          updated_at?: string | null
          users_id?: string
          vehicle_type?: string | null
          visit_date?: string
        }
        Relationships: []
      }
      document_tables: {
        Row: {
          document_id: string
          documentable_id: string
          documentable_type: string
        }
        Insert: {
          document_id?: string
          documentable_id: string
          documentable_type: string
        }
        Update: {
          document_id?: string
          documentable_id?: string
          documentable_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_documentables_document"
            columns: ["document_id"]
            isOneToOne: true
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          author_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          status: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          images: Json | null
          name: string
          slug: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          name: string
          slug?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          name?: string
          slug?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      guests_reservation: {
        Row: {
          created_at: string | null
          data: Json | null
          deleted_at: string | null
          email: string
          first_name: string
          id: string
          image: Json | null
          last_name: string
          phone: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          deleted_at?: string | null
          email: string
          first_name: string
          id?: string
          image?: Json | null
          last_name: string
          phone?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          deleted_at?: string | null
          email?: string
          first_name?: string
          id?: string
          image?: Json | null
          last_name?: string
          phone?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      meters: {
        Row: {
          author_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          meter_number: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          meter_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          meter_number?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meters_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_role: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_role_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_role_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_user: {
        Row: {
          permission_id: string
          user_id: string
        }
        Insert: {
          permission_id: string
          user_id: string
        }
        Update: {
          permission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_user_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          deleted_at: string | null
          expires_at: string
          facility_id: string
          id: string
          notes: string | null
          number_attendees: string
          number_pax: string
          starts_at: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          deleted_at?: string | null
          expires_at: string
          facility_id: string
          id?: string
          notes?: string | null
          number_attendees: string
          number_pax: string
          starts_at: string
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          deleted_at?: string | null
          expires_at?: string
          facility_id?: string
          id?: string
          notes?: string | null
          number_attendees?: string
          number_pax?: string
          starts_at?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      role_user: {
        Row: {
          role_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          user_id: string
        }
        Update: {
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_user_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      role_worker: {
        Row: {
          role_id: string
          worker_id: string
        }
        Insert: {
          role_id: string
          worker_id: string
        }
        Update: {
          role_id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_worker_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "worker_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_worker_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ticket_conversations: {
        Row: {
          author_id: string
          created_at: string
          deleted_at: string | null
          id: string
          message: string
          ticket_id: string
          type: string
          updated_at: string
        }
        Insert: {
          author_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          message: string
          ticket_id: string
          type: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          message?: string
          ticket_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          body: string
          category_id: string
          created_at: string
          deleted_at: string | null
          id: string
          reference: string
          status: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          body: string
          category_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          reference: string
          status: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          body?: string
          category_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          reference?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          approved_at: string | null
          avatar: string | null
          created_at: string | null
          deleted_at: string | null
          dob: string | null
          email: string
          first_name: string | null
          id: string
          is_new: boolean | null
          last_name: string | null
          middle_name: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          avatar?: string | null
          created_at?: string | null
          deleted_at?: string | null
          dob?: string | null
          email: string
          first_name?: string | null
          id: string
          is_new?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          avatar?: string | null
          created_at?: string | null
          deleted_at?: string | null
          dob?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_new?: boolean | null
          last_name?: string | null
          middle_name?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      utilities_billing: {
        Row: {
          author_id: string
          bill_amount: number
          bill_date: string
          billing_invoice: string
          billing_month: string
          billing_period_end_date: string
          billing_period_start_date: string
          company_name: string
          consumption: number
          created_at: string
          current_meter_reading: string
          deleted_at: string | null
          id: string
          payment_amount: number
          payment_date: string
          payment_reference_number: string
          period_covered: string
          previous_meter_reading: string
          status: string
          updated_at: string
        }
        Insert: {
          author_id: string
          bill_amount: number
          bill_date?: string
          billing_invoice: string
          billing_month: string
          billing_period_end_date?: string
          billing_period_start_date?: string
          company_name: string
          consumption: number
          created_at?: string
          current_meter_reading: string
          deleted_at?: string | null
          id?: string
          payment_amount: number
          payment_date?: string
          payment_reference_number: string
          period_covered: string
          previous_meter_reading: string
          status?: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          bill_amount?: number
          bill_date?: string
          billing_invoice?: string
          billing_month?: string
          billing_period_end_date?: string
          billing_period_start_date?: string
          company_name?: string
          consumption?: number
          created_at?: string
          current_meter_reading?: string
          deleted_at?: string | null
          id?: string
          payment_amount?: number
          payment_date?: string
          payment_reference_number?: string
          period_covered?: string
          previous_meter_reading?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      vehicle_data: {
        Row: {
          author_id: string | null
          cr_id: string | null
          created_at: string | null
          id: string
          or_id: string | null
          prehai_cert_date: string | null
          prehai_cert_receipt_number: string | null
          prehai_sticker_number: string | null
          updated_at: string | null
          vehicle_id: string | null
          vg_sticker_date: string | null
          vg_sticker_number: string | null
          year: string
        }
        Insert: {
          author_id?: string | null
          cr_id?: string | null
          created_at?: string | null
          id?: string
          or_id?: string | null
          prehai_cert_date?: string | null
          prehai_cert_receipt_number?: string | null
          prehai_sticker_number?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
          vg_sticker_date?: string | null
          vg_sticker_number?: string | null
          year: string
        }
        Update: {
          author_id?: string | null
          cr_id?: string | null
          created_at?: string | null
          id?: string
          or_id?: string | null
          prehai_cert_date?: string | null
          prehai_cert_receipt_number?: string | null
          prehai_sticker_number?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
          vg_sticker_date?: string | null
          vg_sticker_number?: string | null
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_data_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_data_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          author_id: string | null
          avatar: string | null
          body_type: string
          color: string
          created_at: string | null
          deleted_at: string | null
          id: string
          make: string
          model: string
          plate_number: string
          updated_at: string | null
          year: string
        }
        Insert: {
          author_id?: string | null
          avatar?: string | null
          body_type: string
          color: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          make: string
          model: string
          plate_number: string
          updated_at?: string | null
          year: string
        }
        Update: {
          author_id?: string | null
          avatar?: string | null
          body_type?: string
          color?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          make?: string
          model?: string
          plate_number?: string
          updated_at?: string | null
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors_pass: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          name: string
          photo: string | null
          plate_number: string | null
          status: string | null
          updated_at: string | null
          users_id: string
          vehicle_color: string | null
          vehicle_make_model: string | null
          visit_expiration: string
          visit_start: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          name: string
          photo?: string | null
          plate_number?: string | null
          status?: string | null
          updated_at?: string | null
          users_id: string
          vehicle_color?: string | null
          vehicle_make_model?: string | null
          visit_expiration: string
          visit_start: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          name?: string
          photo?: string | null
          plate_number?: string | null
          status?: string | null
          updated_at?: string | null
          users_id?: string
          vehicle_color?: string | null
          vehicle_make_model?: string | null
          visit_expiration?: string
          visit_start?: string
        }
        Relationships: []
      }
      waterbills: {
        Row: {
          adv_payment: string | null
          author_id: string | null
          billing_month: string | null
          consumption: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          meter_id: string | null
          payment: string | null
          pres_reading: string | null
          prev_reading: string | null
          pst_due: string | null
          rate_cum: string | null
          receipt: string | null
          rolling_balance: string | null
          status: string | null
          total: string | null
          total_due: string | null
          updated_at: string | null
        }
        Insert: {
          adv_payment?: string | null
          author_id?: string | null
          billing_month?: string | null
          consumption?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          meter_id?: string | null
          payment?: string | null
          pres_reading?: string | null
          prev_reading?: string | null
          pst_due?: string | null
          rate_cum?: string | null
          receipt?: string | null
          rolling_balance?: string | null
          status?: string | null
          total?: string | null
          total_due?: string | null
          updated_at?: string | null
        }
        Update: {
          adv_payment?: string | null
          author_id?: string | null
          billing_month?: string | null
          consumption?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          meter_id?: string | null
          payment?: string | null
          pres_reading?: string | null
          prev_reading?: string | null
          pst_due?: string | null
          rate_cum?: string | null
          receipt?: string | null
          rolling_balance?: string | null
          status?: string | null
          total?: string | null
          total_due?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waterbills_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waterbills_meter_id_fkey"
            columns: ["meter_id"]
            isOneToOne: false
            referencedRelation: "meters"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_roles: {
        Row: {
          author_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          created_at: string
          deleted_at?: string | null
          id?: string
          name: string
          type: string
          updated_at: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_roles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_timesheets: {
        Row: {
          author_id: string
          created_at: string
          gate: string | null
          id: string
          type: string
          updated_at: string
          worker_id: string
        }
        Insert: {
          author_id: string
          created_at?: string
          gate?: string | null
          id?: string
          type: string
          updated_at?: string
          worker_id: string
        }
        Update: {
          author_id?: string
          created_at?: string
          gate?: string | null
          id?: string
          type?: string
          updated_at?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_timesheets_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          address: string | null
          author_id: string
          avatar: string | null
          contact: string | null
          created_at: string
          deleted_at: string | null
          expires_at: string | null
          first_name: string
          id: string
          last_name: string
          middle_name: string | null
          notes: string | null
          qr_code_hash: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          author_id: string
          avatar?: string | null
          contact?: string | null
          created_at?: string
          deleted_at?: string | null
          expires_at?: string | null
          first_name: string
          id?: string
          last_name: string
          middle_name?: string | null
          notes?: string | null
          qr_code_hash?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          author_id?: string
          avatar?: string | null
          contact?: string | null
          created_at?: string
          deleted_at?: string | null
          expires_at?: string | null
          first_name?: string
          id?: string
          last_name?: string
          middle_name?: string | null
          notes?: string | null
          qr_code_hash?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workers_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_cbm_data: {
        Args: {
          data_json: Json
        }
        Returns: Json
      }
      insert_cbm_rate: {
        Args: {
          data_json: Json
        }
        Returns: Json
      }
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
