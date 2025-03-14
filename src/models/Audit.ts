
import mongoose, { Schema, Document } from 'mongoose';
import { AuditType, AuditStatus } from '@/types';

// Create interface extending Document for TypeScript support
export interface IAudit extends Omit<AuditType, 'id'>, Document {}

const AuditItemSchema = new Schema({
  question: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['yes-no', 'multiple-choice', 'text', 'numeric']
  },
  options: [String],
  required: { type: Boolean, default: true },
  response: { type: Schema.Types.Mixed }
});

const AuditSectionSchema = new Schema({
  title: { type: String, required: true },
  items: [AuditItemSchema]
});

const AuditSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  auditorId: { type: Schema.Types.ObjectId, ref: 'Auditor' },
  sections: [AuditSectionSchema]
}, { timestamps: true });

// Convert Mongoose _id to id when converting to JSON
AuditSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Convert createdAt and updatedAt to strings
AuditSchema.virtual('createdAt').get(function() {
  return this._doc.createdAt.toISOString();
});

AuditSchema.virtual('updatedAt').get(function() {
  return this._doc.updatedAt.toISOString();
});

// Create and export the model
export default mongoose.models.Audit || mongoose.model<IAudit>('Audit', AuditSchema);
