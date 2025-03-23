
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
            required: true,
            response: false,
            notes: "Several cutting boards showed signs of cross-contamination between raw meat and vegetables. Immediate cleaning protocol revision needed."
          },
          {
            id: "item-2",
            question: "Is the refrigerator temperature maintained below 40°F (4°C)?",
            type: "yes-no",
            required: true,
            response: true
          },
          {
            id: "item-3",
            question: "Are all utensils properly sanitized after each use?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Staff observed reusing utensils without proper sanitization between different food items."
          }
        ]
      },
      {
        id: "section-2",
        title: "Food Storage",
        items: [
          {
            id: "item-4",
            question: "Are raw foods stored separately from ready-to-eat foods?",
            type: "yes-no",
            required: true,
            response: true
          },
          {
            id: "item-5",
            question: "Are all food items properly labeled and dated?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Multiple containers found without date labels in walk-in cooler. Staff need retraining on labeling protocols."
          },
          {
            id: "item-6",
            question: "Are dry goods stored at least 6 inches off the floor?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Several bags of flour and rice found directly on the floor in the storage area."
          }
        ]
      },
      {
        id: "section-3",
        title: "Employee Hygiene",
        items: [
          {
            id: "item-7",
            question: "Do employees wash hands between tasks?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Multiple staff members observed not washing hands when switching between food handling tasks."
          },
          {
            id: "item-8",
            question: "Are proper hair restraints worn by all food handlers?",
            type: "yes-no",
            required: true,
            response: true
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
            required: true,
            response: false,
            notes: "3 employees found without required safety gloves during food handling. Immediate corrective action required."
          },
          {
            id: "item-2",
            question: "Is equipment being sanitized between production runs?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Sanitization logs incomplete for night shift operations. No evidence of proper cleaning between product changeovers."
          }
        ]
      },
      {
        id: "section-2",
        title: "Quality Control",
        items: [
          {
            id: "item-3",
            question: "Are batch samples tested according to schedule?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "QC testing logs show gaps for 3 consecutive production days. Testing procedure not followed consistently."
          },
          {
            id: "item-4",
            question: "Are testing records properly maintained and accessible?",
            type: "yes-no",
            required: true,
            response: true
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
      },
      {
        id: "section-2",
        title: "Storage and Refrigeration",
        items: [
          {
            id: "item-3",
            question: "Is the refrigerator temperature recorded daily?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Temperature log missing entries for 5 days in the past month."
          },
          {
            id: "item-4",
            question: "Are food deliveries checked and dated upon receipt?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "No documentation found for recent dairy deliveries. Staff unable to verify expiration dates."
          }
        ]
      }
    ]
  }
];
