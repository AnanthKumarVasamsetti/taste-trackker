
export type AuditorType = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  assignedAudits: string[];
};

export type AuditStatus = 'pending' | 'in-progress' | 'completed';

export type AuditSectionType = {
  id: string;
  title: string;
  items: AuditItemType[];
};

export type AuditItemType = {
  id: string;
  question: string;
  type: 'yes-no' | 'multiple-choice' | 'text' | 'numeric';
  options?: string[];
  required: boolean;
  response?: string | number | boolean;
  notes?: string;
};

export type AuditType = {
  id: string;
  title: string;
  description: string;
  location: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  status: AuditStatus;
  auditorId?: string;
  sections: AuditSectionType[];
  completedSections?: string[];
  notes?: string;
  submittedAt?: string;
};

export type AuditResponseType = {
  auditId: string;
  auditorId: string;
  responses: {
    sectionId: string;
    items: {
      itemId: string;
      response: string | number | boolean;
      notes?: string;
    }[];
  }[];
  status: AuditStatus;
  completedAt?: string;
  notes?: string;
};

// Analytics Types
export type AnalyticsChartDataPoint = {
  name: string;
  value: number;
  category?: string;
  percentage?: number;
};

export type ComplianceTrendDataPoint = {
  date: string;
  category: string;
  value: number;
};

export type IssueTypeDataPoint = {
  name: string;
  count: number;
  severity: 'high' | 'medium' | 'low';
};

// Database Schema Types
export interface DbSchema {
  users: UserTable;
  auditors: AuditorTable;
  audits: AuditTable;
  audit_templates: AuditTemplateTable;
  audit_sections: AuditSectionTable;
  audit_items: AuditItemTable;
  audit_responses: AuditResponseTable;
  audit_item_responses: AuditItemResponseTable;
}

export interface UserTable {
  id: string; // Primary key
  email: string; // Unique
  password_hash: string;
  name: string;
  role: 'admin' | 'manager' | 'auditor';
  created_at: string;
  last_login: string | null;
}

export interface AuditorTable {
  id: string; // Primary key
  user_id: string; // Foreign key to users.id
  phone: string | null;
  role: string; // Position/specialty, e.g., "Food Safety Specialist"
  created_at: string;
  updated_at: string;
}

export interface AuditTable {
  id: string; // Primary key
  title: string;
  description: string;
  location: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  status: AuditStatus;
  auditor_id: string | null; // Foreign key to auditors.id
  template_id: string | null; // Foreign key to audit_templates.id
  created_by: string; // Foreign key to users.id
  notes: string | null;
  submitted_at: string | null;
}

export interface AuditTemplateTable {
  id: string; // Primary key
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string; // Foreign key to users.id
  is_active: boolean;
}

export interface AuditSectionTable {
  id: string; // Primary key
  title: string;
  audit_id: string | null; // Foreign key to audits.id
  template_id: string | null; // Foreign key to audit_templates.id
  order_index: number; // For ordering sections
  created_at: string;
  updated_at: string;
}

export interface AuditItemTable {
  id: string; // Primary key
  section_id: string; // Foreign key to audit_sections.id
  question: string;
  type: 'yes-no' | 'multiple-choice' | 'text' | 'numeric';
  options: string[] | null; // JSON array for multiple-choice options
  required: boolean;
  order_index: number; // For ordering items within a section
  created_at: string;
  updated_at: string;
  category?: string; // Optional category for analytics grouping
}

export interface AuditResponseTable {
  id: string; // Primary key
  audit_id: string; // Foreign key to audits.id
  auditor_id: string; // Foreign key to auditors.id
  status: AuditStatus;
  started_at: string;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditItemResponseTable {
  id: string; // Primary key
  audit_response_id: string; // Foreign key to audit_responses.id
  item_id: string; // Foreign key to audit_items.id
  response: string; // Stored as string for all types, converted as needed
  notes: string | null;
  created_at: string;
  updated_at: string;
}
