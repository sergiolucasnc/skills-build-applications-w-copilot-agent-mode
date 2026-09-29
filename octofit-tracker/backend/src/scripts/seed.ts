import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString, { dbName: 'octofit_db' });

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Rivera', email: 'alex@example.com', age: 15 },
      { name: 'Jordan Lee', email: 'jordan@example.com', age: 16 },
      { name: 'Sam Patel', email: 'sam@example.com', age: 15 },
    ]);
    const teams = await Team.create([
      { name: 'Trail Blazers', description: 'Outdoor miles and steady progress', members: [users[0]._id, users[1]._id] },
      { name: 'Power Crew', description: 'Strength, balance, and teamwork', members: [users[2]._id] },
    ]);

    users[0].team = teams[0]._id;
    users[1].team = teams[0]._id;
    users[2].team = teams[1]._id;
    await Promise.all(users.map((user) => user.save()));

    await Activity.create([
      { user: users[0]._id, team: teams[0]._id, type: 'running', durationMinutes: 32, distanceKm: 4.2, calories: 280, points: 42, date: new Date('2026-09-26') },
      { user: users[1]._id, team: teams[0]._id, type: 'cycling', durationMinutes: 45, distanceKm: 12, calories: 360, points: 45, date: new Date('2026-09-27') },
      { user: users[2]._id, team: teams[1]._id, type: 'strength', durationMinutes: 30, calories: 190, points: 30, date: new Date('2026-09-28') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 42 },
      { user: users[1]._id, points: 45 },
      { user: users[2]._id, points: 30 },
    ]);

    await Workout.create([
      { title: 'Easy-paced run', activityType: 'running', description: 'A comfortable run at a pace that allows conversation.', durationMinutes: 25, difficulty: 'beginner' },
      { title: 'Bodyweight circuit', activityType: 'strength', description: 'Complete three rounds of squats, push-ups, and planks.', durationMinutes: 20, difficulty: 'beginner' },
      { title: 'Neighborhood ride', activityType: 'cycling', description: 'Ride at a steady pace and keep a relaxed cadence.', durationMinutes: 35, difficulty: 'intermediate' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
