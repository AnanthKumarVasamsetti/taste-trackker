
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
  },
  {
    id: "auditor-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 789-0123",
    role: "Compliance Officer",
    assignedAudits: ["audit-6", "audit-7"]
  },
  {
    id: "auditor-5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 456-7890",
    role: "Food Safety Inspector",
    assignedAudits: ["audit-8"]
  }
];

export const mockAudits: AuditType[] = [
  {
    id: "audit-001",
    title: "Quarterly Kitchen Inspection",
    description: "Standard quarterly inspection of kitchen facilities and food safety practices",
    location: "Main Street Restaurant",
    dueDate: "2025-05-15",
    createdAt: "2025-04-20",
    updatedAt: "2025-04-20",
    status: "in-progress",
    auditorId: "auditor-1",
    sections: [
      {
        id: "section-001",
        title: "Kitchen Cleanliness",
        items: [
          {
            id: "item-001",
            question: "Are all food preparation surfaces properly sanitized?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-002",
            question: "Is the floor clean and free of debris?",
            type: "yes-no",
            required: true
          }
        ]
      },
      {
        id: "section-002",
        title: "Food Storage",
        items: [
          {
            id: "item-003",
            question: "Are refrigerators maintaining proper temperature (below 40°F/4°C)?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-004",
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
    status: "in-progress",
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
      },
      {
        id: "section-2",
        title: "Quality Control",
        items: [
          {
            id: "item-3",
            question: "Are batch samples tested according to schedule?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-4",
            question: "Are testing records properly maintained and accessible?",
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
    status: "in-review",
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
  },
  {
    id: "audit-4",
    title: "Quarterly Food Safety Inspection",
    description: "Comprehensive food safety audit for downtown cafeteria",
    location: "567 Oak Street, Dallas, TX",
    dueDate: "2023-11-30",
    createdAt: "2023-10-15",
    updatedAt: "2023-11-01",
    status: "in-review",
    auditorId: "auditor-2",
    sections: [
      {
        id: "section-1",
        title: "Food Handling",
        items: [
          {
            id: "item-1",
            question: "Are all food handlers wearing proper gloves?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Two staff members observed handling ready-to-eat foods without gloves."
          },
          {
            id: "item-2",
            question: "Is there proper separation between raw and cooked foods?",
            type: "yes-no",
            required: true,
            response: true
          }
        ]
      },
      {
        id: "section-2",
        title: "Temperature Control",
        items: [
          {
            id: "item-3",
            question: "Are refrigerators maintaining temperatures below 40°F?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Dairy refrigerator recorded at 44°F, maintenance request submitted."
          },
          {
            id: "item-4",
            question: "Are hot-holding units maintaining foods above 135°F?",
            type: "yes-no",
            required: true,
            response: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-5",
    title: "Bakery Health Inspection",
    description: "Annual health inspection for Sweet Delights Bakery",
    location: "123 Pastry Lane, Phoenix, AZ",
    dueDate: "2023-11-15",
    createdAt: "2023-10-10",
    updatedAt: "2023-10-30",
    status: "pending",
    auditorId: "auditor-3",
    sections: [
      {
        id: "section-1",
        title: "Hygiene Standards",
        items: [
          {
            id: "item-1",
            question: "Are handwashing stations properly supplied and accessible?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-2",
            question: "Are all food contact surfaces cleaned and sanitized regularly?",
            type: "yes-no",
            required: true
          }
        ]
      },
      {
        id: "section-2",
        title: "Allergen Management",
        items: [
          {
            id: "item-3",
            question: "Are allergens properly labeled on all products?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-4",
            question: "Is there a protocol for preventing cross-contamination of allergens?",
            type: "yes-no",
            required: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-6",
    title: "Cafeteria Monthly Inspection",
    description: "Routine monthly inspection of high school cafeteria",
    location: "Lincoln High School",
    dueDate: "2023-11-25",
    createdAt: "2023-11-01",
    updatedAt: "2023-11-01",
    status: "pending",
    auditorId: "auditor-4",
    sections: [
      {
        id: "section-1",
        title: "Food Preparation",
        items: [
          {
            id: "item-1",
            question: "Are food handlers following proper hygiene protocols?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-2",
            question: "Are food preparation areas clean and sanitized?",
            type: "yes-no",
            required: true
          }
        ]
      },
      {
        id: "section-2",
        title: "Equipment Maintenance",
        items: [
          {
            id: "item-3",
            question: "Is all equipment clean and in good working condition?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-4",
            question: "Are thermometers calibrated and used appropriately?",
            type: "yes-no",
            required: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-7",
    title: "Restaurant Compliance Check",
    description: "Quarterly compliance inspection for downtown restaurant",
    location: "The Grill House, 123 Main St",
    dueDate: "2023-12-05",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-05",
    status: "pending",
    auditorId: "auditor-4",
    sections: [
      {
        id: "section-1",
        title: "Sanitation Standards",
        items: [
          {
            id: "item-1",
            question: "Are cleaning chemicals properly stored and labeled?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-2",
            question: "Is the cleaning schedule followed and documented?",
            type: "yes-no",
            required: true
          }
        ]
      },
      {
        id: "section-2",
        title: "Pest Control",
        items: [
          {
            id: "item-3",
            question: "Is there evidence of pest activity?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-4",
            question: "Are pest control records up to date?",
            type: "yes-no",
            required: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-8",
    title: "Hotel Kitchen Audit",
    description: "Annual food safety audit for Grand Hotel kitchen facilities",
    location: "Grand Hotel, 500 Luxury Ave",
    dueDate: "2023-12-15",
    createdAt: "2023-11-10",
    updatedAt: "2023-11-10",
    status: "pending",
    auditorId: "auditor-5",
    sections: [
      {
        id: "section-1",
        title: "Staff Training",
        items: [
          {
            id: "item-1",
            question: "Have all staff been trained in food safety procedures?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-2",
            question: "Are training records complete and up to date?",
            type: "yes-no",
            required: true
          }
        ]
      },
      {
        id: "section-2",
        title: "Storage Facilities",
        items: [
          {
            id: "item-3",
            question: "Are dry goods stored properly off the floor?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-4",
            question: "Is the FIFO (First In, First Out) system being followed?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-5",
            question: "What is the current temperature of the walk-in refrigerator?",
            type: "numeric",
            required: true
          }
        ]
      },
      {
        id: "section-3",
        title: "Cross-Contamination Prevention",
        items: [
          {
            id: "item-6",
            question: "Are color-coded cutting boards used appropriately?",
            type: "yes-no",
            required: true
          },
          {
            id: "item-7",
            question: "Are raw foods stored separately from ready-to-eat foods?",
            type: "yes-no",
            required: true
          }
        ]
      }
    ]
  }
];
