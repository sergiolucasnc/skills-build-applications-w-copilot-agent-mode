import mongoose, { Schema, Types } from 'mongoose';

interface UserRecord {
  name: string;
  email: string;
  age?: number;
  team?: Types.ObjectId;
}

const userSchema = new Schema<UserRecord>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  age: { type: Number, min: 1 },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  type: { type: String, enum: ['running', 'walking', 'strength', 'cycling'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0 },
  calories: { type: Number, min: 0 },
  points: { type: Number, default: 0, min: 0 },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });

const workoutSchema = new Schema({
  title: { type: String, required: true, trim: true },
  activityType: { type: String, enum: ['running', 'walking', 'strength', 'cycling'], required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
}, { timestamps: true });

export const User = (mongoose.models.User as mongoose.Model<UserRecord> | undefined)
  ?? mongoose.model<UserRecord>('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);