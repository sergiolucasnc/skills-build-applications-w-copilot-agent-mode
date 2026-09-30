import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json(await User.find().populate('team').sort({ name: 1 }));
});
router.post('/users/', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});
router.get('/users/:id/', async (request, response) => {
  const user = await User.findById(request.params.id).populate('team');
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.json(user);
});
router.put('/users/:id/', async (request, response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.json(user);
});
router.delete('/users/:id/', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.status(204).end();
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }));
});
router.post('/teams/', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});
router.get('/teams/:id/', async (request, response) => {
  const team = await Team.findById(request.params.id).populate('members');
  if (!team) return response.status(404).json({ error: 'Team not found' });
  response.json(team);
});
router.put('/teams/:id/', async (request, response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!team) return response.status(404).json({ error: 'Team not found' });
  response.json(team);
});
router.delete('/teams/:id/', async (request, response) => {
  const team = await Team.findByIdAndDelete(request.params.id);
  if (!team) return response.status(404).json({ error: 'Team not found' });
  response.status(204).end();
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user team').sort({ date: -1 }));
});
router.post('/activities/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});
router.get('/activities/:id/', async (request, response) => {
  const activity = await Activity.findById(request.params.id).populate('user team');
  if (!activity) return response.status(404).json({ error: 'Activity not found' });
  response.json(activity);
});
router.put('/activities/:id/', async (request, response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!activity) return response.status(404).json({ error: 'Activity not found' });
  response.json(activity);
});
router.delete('/activities/:id/', async (request, response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id);
  if (!activity) return response.status(404).json({ error: 'Activity not found' });
  response.status(204).end();
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ points: -1, updatedAt: 1 }));
});

router.get('/workouts/', async (request, response) => {
  const activityType = typeof request.query.activityType === 'string' ? request.query.activityType : undefined;
  const filter = activityType ? { activityType } : {};
  response.json(await Workout.find(filter).sort({ title: 1 }));
});
router.post('/workouts/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});
router.get('/workouts/:id/', async (request, response) => {
  const workout = await Workout.findById(request.params.id);
  if (!workout) return response.status(404).json({ error: 'Workout not found' });
  response.json(workout);
});
router.put('/workouts/:id/', async (request, response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!workout) return response.status(404).json({ error: 'Workout not found' });
  response.json(workout);
});
router.delete('/workouts/:id/', async (request, response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id);
  if (!workout) return response.status(404).json({ error: 'Workout not found' });
  response.status(204).end();
});

export default router;