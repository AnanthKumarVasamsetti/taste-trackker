
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
    id: "auditor1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-1234",
    role: "Food Safety Specialist",
    assignedAudits: ["audit-in1"],
  },
  {
    id: "auditor2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Quality Assurance Auditor",
    assignedAudits: ["audit-in2"],
  },
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
    status: "in-review",
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
            required: true,
            response: true
          },
          {
            id: "item-2",
            question: "Are all food contact surfaces cleaned and sanitized regularly?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Mixing equipment had residue from previous day's production."
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
            required: true,
            response: false,
            notes: "Three products found with incomplete allergen information on labels."
          },
          {
            id: "item-4",
            question: "Is there a protocol for preventing cross-contamination of allergens?",
            type: "yes-no",
            required: true,
            response: true
          }
        ]
      }
    ]
  },
  {
    id: "audit-in1",
    title: "Kitchen Hygiene Audit - Restaurant A",
    description: "Comprehensive hygiene and safety compliance check in Restaurant A.",
    location: "Restaurant A - Main Kitchen",
    dueDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-review",
    auditorId: "auditor1",
    sections: [
      {
        id: "sec1",
        title: "Cleaning Procedures",
        items: [
          {
            id: "item1",
            question: "Are cleaning chemicals labeled and stored properly?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Chemicals were stored incorrectly under sink.",
          },
          {
            id: "item2",
            question: "Are cleaning schedules documented?",
            type: "yes-no",
            required: true,
            response: true,
          },
        ],
      },
    ],
    notes: "",
  },
  {
    id: "audit-in2",
    title: "Cold Storage Inspection - Warehouse",
    description:
      "Inspection of cold storage facilities for compliance with temperature regulation.",
    location: "Warehouse Cold Storage",
    dueDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-review",
    auditorId: "auditor2",
    sections: [
      {
        id: "sec2",
        title: "Temperature Control",
        items: [
          {
            id: "item3",
            question: "Is the temperature log up to date?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Missing two days of temperature logs.",
          },
        ],
      },
    ],
    notes: "",
  },
];
