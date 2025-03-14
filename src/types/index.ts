
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
};
