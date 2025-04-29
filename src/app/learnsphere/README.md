# LearnSphere Progress Tracking Algorithm

## Overview
LearnSphere is a dashboard for visualizing and tracking student learning progress. This document outlines the algorithm and architecture for tracking, analyzing, and displaying learning metrics. AI APIs can be integrated for personalized recommendations.

## Tracking Algorithm Steps
1. **Define Trackable Events**
   - Lesson completions
   - Quiz attempts and scores
   - Time spent on activities
   - Topics covered

2. **Data Storage**
   - Store user activity in a database (e.g., MongoDB, PostgreSQL) or local storage for prototyping.
   - Example schema:
     ```json
     {
       "userId": "string",
       "activityId": "string",
       "type": "lesson|quiz|note|other",
       "timestamp": "ISO8601 string",
       "score": "number (optional)",
       "duration": "number (seconds, optional)"
     }
     ```

3. **Event Logging**
   - On each user action, log the event to the backend or local storage.
   - Example (frontend):
     ```js
     fetch('/api/track', {
       method: 'POST',
       body: JSON.stringify({ userId, activityId, type, timestamp, score, duration })
     });
     ```

4. **Progress Calculation**
   - Aggregate events to compute:
     - Completion percentage: `completed / total`
     - Average score: `sum(scores) / count`
     - Time spent: `sum(duration)`
   - Example (backend):
     ```js
     // Pseudocode
     const progress = {
       lessonsCompleted: count(events where type==='lesson'),
       quizzesTaken: count(events where type==='quiz'),
       avgScore: average(events where type==='quiz').score,
       totalTime: sum(events).duration
     };
     ```

5. **AI Integration (Optional)**
   - Use AI APIs (e.g., OpenAI, Cohere) to analyze user data and provide personalized study recommendations.
   - Example prompt:
     > "Given this user's activity data, what topics should they review next?"
   - Integrate via API call:
     ```js
     const response = await fetch('https://api.openai.com/v1/chat/completions', { ... });
     ```

6. **Visualization**
   - Display metrics using charts, progress bars, and recommendation cards in the LearnSphere dashboard.

## Example API Endpoints
- `POST /api/track` — Log a user event
- `GET /api/progress?userId=...` — Get aggregated progress data
- `POST /api/recommend` — Get AI-powered study recommendations

## Security & Privacy
- Authenticate all API requests.
- Store only necessary user data.
- Comply with privacy regulations (e.g., GDPR).

---
This document describes the recommended approach for implementing learning progress tracking and analytics in LearnSphere. AI APIs can be added for advanced personalization.
