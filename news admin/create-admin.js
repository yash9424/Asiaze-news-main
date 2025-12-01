require('dotenv').config({ path: '.env' });
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  // Read from .env file
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env file');
    process.exit(1);
  }
  
  console.log('📡 Connecting to MongoDB...');
  console.log('🔗 URI:', uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@'));
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Check if admin exists
    const existing = await db.collection('adminusers').findOne({ email: 'admin@gmail.com' });
    
    if (existing) {
      console.log('Admin already exists. Updating password...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await db.collection('adminusers').updateOne(
        { email: 'admin@gmail.com' },
        { $set: { password: hashedPassword } }
      );
      console.log('Password updated!');
    } else {
      console.log('Creating new admin...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await db.collection('adminusers').insertOne({
        name: 'Super Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        mobile: '1234567890',
        roleName: 'Super Admin',
        modules: {
          news: true,
          stories: true,
          reels: true,
          categories: true,
          users: true,
          notifications: true,
          rewards: true,
          analytics: true,
          ads: true
        },
        status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('✅ Admin created successfully!');
    }
    
    console.log('\n📧 Email: admin@gmail.com');
    console.log('🔑 Password: admin123\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

createAdmin();
