
import { AuditType, AuditorType } from "@/types";

export const mockAuditors: AuditorType[] = [
  {
    id: "auditor-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Auditor",
    assignedAudits: ["audit-1", "audit-3"]
  },
  {
    id: "auditor-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    role: "Food Safety Specialist",
    assignedAudits: ["audit-2"]
  },
  {
    id: "auditor-3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 246-8101",
    role: "Quality Assurance",
    assignedAudits: []
  }
];

export const mockAudits: AuditType[] = [
  {
    id: "audit-1",
    title: "Annual Restaurant Health Inspection",
    description: "Comprehensive health and safety audit for downtown restaurant",
    location: "123 Main St, New York, NY",
    dueDate: "2023-12-15",
    createdAt: "2023-11-01",
    updatedAt: "2023-11-01",
    status: "in-progress",
    auditorId: "auditor-1",
    sections: [
      {
        id: "section-1",
        title: "Kitchen Cleanliness",
        items: [
          {
            id: "item-1",
            question: "Are food preparation surfaces cleaned and sanitized regularly?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-2",
            question: "Is the refrigerator temperature maintained below 40°F (4°C)?",
            type: "yes-no",
            required: true
          }
        ]
      },
      {
        id: "section-2",
        title: "Food Storage",
        items: [
          {
            id: "item-3",
            question: "Are raw foods stored separately from ready-to-eat foods?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-4",
            question: "Are all food items properly labeled and dated?",
            type: "yes-no",
            required: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-2",
    title: "Food Processing Facility Inspection",
    description: "Quarterly safety and compliance check for manufacturing plant",
    location: "456 Industrial Pkwy, Chicago, IL",
    dueDate: "2023-12-30",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-07",
    status: "pending",
    auditorId: "auditor-2",
    sections: [
      {
        id: "section-1",
        title: "Production Line",
        items: [
          {
            id: "item-1",
            question: "Are all production line employees wearing proper PPE?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-2",
            question: "Is equipment being sanitized between production runs?",
            type: "yes-no",
            required: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-3",
    title: "School Cafeteria Evaluation",
    description: "Monthly food safety check for Lincoln High School",
    location: "789 Education Ave, Boston, MA",
    dueDate: "2023-12-10",
    createdAt: "2023-11-08",
    updatedAt: "2023-11-08",
    status: "completed",
    auditorId: "auditor-1",
    sections: [
      {
        id: "section-1",
        title: "Food Service Area",
        items: [
          {
            id: "item-1",
            question: "Are hot foods maintained above 140°F (60°C)?",
            type: "yes-no",
            required: true,
            response: true
          },
          {
            id: "item-2",
            question: "Are serving utensils cleaned and replaced regularly?",
            type: "yes-no",
            required: true,
            response: true
          }
        ]
      }
    ]
  }
];
