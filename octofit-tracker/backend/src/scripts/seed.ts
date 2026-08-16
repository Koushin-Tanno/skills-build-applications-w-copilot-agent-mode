import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        profile: { displayName: 'Alex Rivera', goal: 'Run a faster 5K' },
      },
      {
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        profile: { displayName: 'Jordan Lee', goal: 'Build strength' },
      },
      {
        username: 'sam_yoga',
        email: 'sam@example.com',
        profile: { displayName: 'Sam Patel', goal: 'Improve flexibility' },
      },
    ]);

    const teams = await Team.insertMany([
      { name: 'Morning Movers', members: [users[0]._id, users[2]._id] },
      { name: 'Strength Circle', members: [users[1]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', value: 5.2, recordedAt: new Date('2026-08-12') },
      { user: users[0]._id, type: 'cycling', value: 18.4, recordedAt: new Date('2026-08-14') },
      { user: users[1]._id, type: 'strength', value: 45, recordedAt: new Date('2026-08-13') },
      { user: users[1]._id, type: 'walking', value: 7.1, recordedAt: new Date('2026-08-15') },
      { user: users[2]._id, type: 'yoga', value: 35, recordedAt: new Date('2026-08-12') },
      { user: users[2]._id, type: 'running', value: 3.6, recordedAt: new Date('2026-08-15') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, score: 1280 },
      { user: users[1]._id, team: teams[1]._id, score: 1165 },
      { user: users[2]._id, team: teams[0]._id, score: 1040 },
    ]);

    await Workout.insertMany([
      {
        name: '5K Training Run',
        description: 'A steady interval session for building running endurance.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Warm-up walk', durationMinutes: 5 },
          { name: 'Easy run', durationMinutes: 20 },
          { name: 'Cool-down walk', durationMinutes: 5 },
        ],
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced bodyweight session for the major muscle groups.',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Squats', repetitions: 15, sets: 3 },
          { name: 'Push-ups', repetitions: 10, sets: 3 },
          { name: 'Plank', durationSeconds: 45, sets: 3 },
        ],
      },
      {
        name: 'Mobility Reset',
        description: 'Gentle stretches to restore range of motion after training.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Cat-cow', durationSeconds: 60 },
          { name: 'Low lunge', durationSeconds: 90, sides: 2 },
          { name: 'Child\'s pose', durationSeconds: 90 },
        ],
      },
    ]);

    console.log('Seeded 3 users, 2 teams, 6 activities, 3 leaderboard entries, and 3 workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
