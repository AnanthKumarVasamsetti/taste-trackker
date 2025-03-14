
import { connectToDatabase } from '@/lib/mongodb';
import Audit from '@/models/Audit';
import Auditor from '@/models/Auditor';
import { AuditType, AuditorType } from '@/types';

// Audit APIs
export const fetchAudits = async (): Promise<AuditType[]> => {
  try {
    await connectToDatabase();
    const audits = await Audit.find().lean();
    return audits as unknown as AuditType[];
  } catch (error) {
    console.error('Error fetching audits:', error);
    throw error;
  }
};

export const fetchAuditById = async (id: string): Promise<AuditType> => {
  try {
    await connectToDatabase();
    const audit = await Audit.findById(id).lean();
    if (!audit) {
      throw new Error(`Audit with ID ${id} not found`);
    }
    return audit as unknown as AuditType;
  } catch (error) {
    console.error(`Error fetching audit ${id}:`, error);
    throw error;
  }
};

export const createAudit = async (auditData: Omit<AuditType, 'id' | 'createdAt' | 'updatedAt'>): Promise<AuditType> => {
  try {
    await connectToDatabase();
    const newAudit = new Audit(auditData);
    await newAudit.save();
    
    // If auditor is assigned, update their assignedAudits
    if (auditData.auditorId) {
      await Auditor.findByIdAndUpdate(
        auditData.auditorId,
        { $push: { assignedAudits: newAudit._id } }
      );
    }
    
    return newAudit.toJSON() as unknown as AuditType;
  } catch (error) {
    console.error('Error creating audit:', error);
    throw error;
  }
};

export const updateAudit = async (id: string, auditData: Partial<AuditType>): Promise<AuditType> => {
  try {
    await connectToDatabase();
    
    // If auditorId is being updated, handle reassignment
    const currentAudit = await Audit.findById(id);
    if (currentAudit && auditData.auditorId !== undefined && auditData.auditorId !== currentAudit.auditorId?.toString()) {
      // Remove from previous auditor if exists
      if (currentAudit.auditorId) {
        await Auditor.findByIdAndUpdate(
          currentAudit.auditorId,
          { $pull: { assignedAudits: id } }
        );
      }
      
      // Add to new auditor if provided
      if (auditData.auditorId) {
        await Auditor.findByIdAndUpdate(
          auditData.auditorId,
          { $push: { assignedAudits: id } }
        );
      }
    }
    
    const updatedAudit = await Audit.findByIdAndUpdate(
      id,
      auditData,
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedAudit) {
      throw new Error(`Audit with ID ${id} not found`);
    }
    
    return updatedAudit as unknown as AuditType;
  } catch (error) {
    console.error(`Error updating audit ${id}:`, error);
    throw error;
  }
};

export const deleteAudit = async (id: string): Promise<void> => {
  try {
    await connectToDatabase();
    
    // Get audit to handle auditor reference
    const audit = await Audit.findById(id);
    if (!audit) {
      throw new Error(`Audit with ID ${id} not found`);
    }
    
    // Remove reference from auditor
    if (audit.auditorId) {
      await Auditor.findByIdAndUpdate(
        audit.auditorId,
        { $pull: { assignedAudits: id } }
      );
    }
    
    await Audit.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting audit ${id}:`, error);
    throw error;
  }
};

// Auditor APIs
export const fetchAuditors = async (): Promise<AuditorType[]> => {
  try {
    await connectToDatabase();
    const auditors = await Auditor.find().lean();
    return auditors as unknown as AuditorType[];
  } catch (error) {
    console.error('Error fetching auditors:', error);
    throw error;
  }
};

export const fetchAuditorById = async (id: string): Promise<AuditorType> => {
  try {
    await connectToDatabase();
    const auditor = await Auditor.findById(id).lean();
    if (!auditor) {
      throw new Error(`Auditor with ID ${id} not found`);
    }
    return auditor as unknown as AuditorType;
  } catch (error) {
    console.error(`Error fetching auditor ${id}:`, error);
    throw error;
  }
};

export const createAuditor = async (auditorData: Omit<AuditorType, 'id'>): Promise<AuditorType> => {
  try {
    await connectToDatabase();
    const newAuditor = new Auditor(auditorData);
    await newAuditor.save();
    return newAuditor.toJSON() as unknown as AuditorType;
  } catch (error) {
    console.error('Error creating auditor:', error);
    throw error;
  }
};

export const updateAuditor = async (id: string, auditorData: Partial<AuditorType>): Promise<AuditorType> => {
  try {
    await connectToDatabase();
    const updatedAuditor = await Auditor.findByIdAndUpdate(
      id,
      auditorData,
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedAuditor) {
      throw new Error(`Auditor with ID ${id} not found`);
    }
    
    return updatedAuditor as unknown as AuditorType;
  } catch (error) {
    console.error(`Error updating auditor ${id}:`, error);
    throw error;
  }
};

export const deleteAuditor = async (id: string): Promise<void> => {
  try {
    await connectToDatabase();
    
    // Find the auditor to check for assigned audits
    const auditor = await Auditor.findById(id);
    if (!auditor) {
      throw new Error(`Auditor with ID ${id} not found`);
    }
    
    // Remove references from all assigned audits
    if (auditor.assignedAudits.length > 0) {
      await Audit.updateMany(
        { _id: { $in: auditor.assignedAudits } },
        { $unset: { auditorId: "" } }
      );
    }
    
    await Auditor.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting auditor ${id}:`, error);
    throw error;
  }
};

// Auth API
export const loginUser = async (email: string, password: string): Promise<boolean> => {
  try {
    // In a real app, this would check credentials against database
    // and possibly return a user object or token
    // For now, this is a placeholder that always succeeds if both fields are provided
    await connectToDatabase(); // Ensure DB connection
    return !!(email && password);
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
