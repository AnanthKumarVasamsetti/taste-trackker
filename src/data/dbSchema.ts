
/**
 * FoodAudit Pro Database Schema
 * 
 * This file contains a visual representation of the database schema
 * to help developers understand table relationships.
 * 
 * Database Tables and Relationships:
 * 
 * users
 * ├── id (PK)
 * ├── email (unique)
 * ├── password_hash
 * ├── name
 * ├── role ('admin'|'manager'|'auditor')
 * ├── created_at
 * └── last_login
 *
 * auditors
 * ├── id (PK)
 * ├── user_id (FK -> users.id)
 * ├── phone
 * ├── role (job title/specialty)
 * ├── created_at
 * └── updated_at
 *
 * audit_templates
 * ├── id (PK)
 * ├── title
 * ├── description
 * ├── created_at
 * ├── updated_at
 * ├── created_by (FK -> users.id)
 * └── is_active
 * 
 * audits
 * ├── id (PK)
 * ├── title
 * ├── description
 * ├── location
 * ├── due_date
 * ├── created_at
 * ├── updated_at
 * ├── status ('pending'|'in-progress'|'completed')
 * ├── auditor_id (FK -> auditors.id)
 * ├── template_id (FK -> audit_templates.id)
 * ├── created_by (FK -> users.id)
 * ├── notes
 * └── submitted_at
 *
 * audit_sections
 * ├── id (PK)
 * ├── title
 * ├── audit_id (FK -> audits.id) - can be null if part of template
 * ├── template_id (FK -> audit_templates.id) - can be null if part of specific audit
 * ├── order_index
 * ├── created_at
 * └── updated_at
 * 
 * audit_items
 * ├── id (PK)
 * ├── section_id (FK -> audit_sections.id)
 * ├── question
 * ├── type ('yes-no'|'multiple-choice'|'text'|'numeric')
 * ├── options (array, for multiple-choice)
 * ├── required
 * ├── order_index
 * ├── created_at
 * └── updated_at
 * 
 * audit_responses
 * ├── id (PK)
 * ├── audit_id (FK -> audits.id)
 * ├── auditor_id (FK -> auditors.id)
 * ├── status ('pending'|'in-progress'|'completed')
 * ├── started_at
 * ├── completed_at
 * ├── notes
 * ├── created_at
 * └── updated_at
 * 
 * audit_item_responses
 * ├── id (PK)
 * ├── audit_response_id (FK -> audit_responses.id)
 * ├── item_id (FK -> audit_items.id)
 * ├── response (stored as string)
 * ├── notes
 * ├── created_at
 * └── updated_at
 * 
 * Relationships:
 * - A user can be an auditor (1:1)
 * - An auditor can be assigned to many audits (1:N)
 * - An audit can be created from a template (N:1)
 * - A template has many sections (1:N)
 * - An audit has many sections (1:N)
 * - A section has many items (1:N)
 * - An audit has many responses (1:N)
 * - An audit response has many item responses (1:N)
 */

export const DB_SCHEMA_VERSION = '1.0.0';

// Sample SQL to create the tables in a PostgreSQL database
export const createTablesSql = `
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'auditor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE auditors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  phone TEXT,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
  auditor_id UUID REFERENCES auditors(id),
  template_id UUID REFERENCES audit_templates(id),
  created_by UUID REFERENCES users(id) NOT NULL,
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE audit_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  audit_id UUID REFERENCES audits(id),
  template_id UUID REFERENCES audit_templates(id),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (
    (audit_id IS NOT NULL AND template_id IS NULL) OR
    (audit_id IS NULL AND template_id IS NOT NULL)
  )
);

CREATE TABLE audit_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES audit_sections(id) NOT NULL,
  question TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('yes-no', 'multiple-choice', 'text', 'numeric')),
  options JSONB,
  required BOOLEAN NOT NULL DEFAULT TRUE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES audits(id) NOT NULL,
  auditor_id UUID REFERENCES auditors(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_item_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_response_id UUID REFERENCES audit_responses(id) NOT NULL,
  item_id UUID REFERENCES audit_items(id) NOT NULL,
  response TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for frequently accessed foreign keys
CREATE INDEX idx_auditors_user_id ON auditors(user_id);
CREATE INDEX idx_audits_auditor_id ON audits(auditor_id);
CREATE INDEX idx_audits_template_id ON audits(template_id);
CREATE INDEX idx_audit_sections_audit_id ON audit_sections(audit_id);
CREATE INDEX idx_audit_sections_template_id ON audit_sections(template_id);
CREATE INDEX idx_audit_items_section_id ON audit_items(section_id);
CREATE INDEX idx_audit_responses_audit_id ON audit_responses(audit_id);
CREATE INDEX idx_audit_responses_auditor_id ON audit_responses(auditor_id);
CREATE INDEX idx_audit_item_responses_response_id ON audit_item_responses(audit_response_id);
CREATE INDEX idx_audit_item_responses_item_id ON audit_item_responses(item_id);
`;
