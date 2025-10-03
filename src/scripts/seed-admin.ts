// D:\PersonalClientWork\quiz-contest\quiz-contest-bcknd\src\scripts\seed-admin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import config from '../app/config';
import { User } from '../app/modules/User/user.model';

const seedAdmin = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ contact: 'admin@quiz.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12); // Updated password to 'admin123'
    
    const adminUser = new User({
      fullNameBangla: 'এডমিন',
      fullNameEnglish: 'Admin',
      contact: 'admin@quiz.com',
      contactType: 'email',
      password: hashedPassword,
      role: 'admin',
      age: 30,
      grade: 'admin',
      address: 'Admin Address',
      interests: ['administration'],
      isActive: true
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();