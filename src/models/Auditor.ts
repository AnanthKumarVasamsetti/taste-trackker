
import mongoose, { Schema, Document } from 'mongoose';
import { AuditorType } from '@/types';

// Create interface extending Document for TypeScript support
export interface IAuditor extends Omit<AuditorType, 'id'>, Document {}

const AuditorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, required: true },
  assignedAudits: [{ type: Schema.Types.ObjectId, ref: 'Audit' }]
}, { timestamps: true });

// Convert Mongoose _id to id when converting to JSON
AuditorSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Create and export the model
export default mongoose.models.Auditor || mongoose.model<IAuditor>('Auditor', AuditorSchema);
