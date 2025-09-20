# Question Module - Updated Schema

This module now supports three types of questions: MCQ, Short Answer, and Written Questions with image upload functionality.

## Question Types

### 1. MCQ Questions

- **questionType**: "MCQ"
- **options**: Array of answer choices (required)
- **correctAnswer**: The correct option (required)
- **No image uploads allowed**

### 2. Short Questions

- **questionType**: "Short"
- **correctAnswer**: Expected short answer (required)
- **uploadedImages**: Optional images for the question
- **participantImages**: Images uploaded by participants when answering

### 3. Written Questions

- **questionType**: "Written"
- **wordLimit**: Minimum word count (optional, default: 50)
- **timeLimit**: Time limit in minutes (optional)
- **uploadedImages**: Optional images for the question
- **participantImages**: Images uploaded by participants when answering

## API Endpoints

### Basic CRUD Operations

- `POST /questions` - Create a new question
- `GET /questions` - Get all questions
- `GET /questions/:id` - Get question by ID
- `GET /questions/quiz/:quizId` - Get questions by quiz ID

### Question Type Specific

- `GET /questions/type/:type` - Get questions by type (MCQ/Short/Written)

### Image Upload

- `POST /questions/upload-images` - Upload images for questions
- `PUT /questions/:questionId/images` - Update question with uploaded images

### Answer Submission

- `POST /questions/:questionId/submit-answer` - Submit answer with optional image upload

## Usage Examples

### Creating an MCQ Question

```json
POST /questions
{
  "quizId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "questionType": "MCQ",
  "text": "What is the capital of Bangladesh?",
  "options": ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"],
  "correctAnswer": "Dhaka",
  "marks": 5,
  "difficulty": "easy"
}
```

### Creating a Short Question with Images

```json
POST /questions
{
  "quizId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "questionType": "Short",
  "text": "Explain the process shown in the image",
  "correctAnswer": "The process involves...",
  "marks": 10,
  "difficulty": "medium",
  "uploadedImages": [
    {
      "filename": "img-1234567890-123456789.jpg",
      "originalName": "process-diagram.jpg",
      "mimetype": "image/jpeg",
      "size": 1024000,
      "path": "/uploads/question-images/img-1234567890-123456789.jpg",
      "uploadedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Creating a Written Question

```json
POST /questions
{
  "quizId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "questionType": "Written",
  "text": "Write an essay about climate change",
  "marks": 25,
  "difficulty": "hard",
  "wordLimit": 500,
  "timeLimit": 30
}
```

### Uploading Images

```bash
POST /questions/upload-images
Content-Type: multipart/form-data

images: [file1.jpg, file2.png, ...]
```

### Submitting an Answer with Images

```bash
POST /questions/:questionId/submit-answer
Content-Type: multipart/form-data

answer: "My answer text"
participantId: "participant123"
images: [answer-image1.jpg, answer-image2.png]
```

## File Upload Configuration

The system uses multer for file uploads with the following configuration:

- **Image files**: Stored in `/uploads/question-images/`
- **Other files**: Stored in `/uploads/question-files/`
- **Max file size**: 10MB for images, 50MB for other files
- **Max files per upload**: 5 files
- **Allowed image types**: JPEG, PNG, GIF, WebP, SVG
- **Allowed document types**: PDF, Word, Excel, Text, ZIP, RAR, 7Z

## Database Schema

The question schema includes:

- Basic question fields (text, marks, difficulty, etc.)
- Question type specific fields
- Image upload support for Short and Written questions
- Participant response tracking
- Timestamps for creation and answering

## Error Handling

The system includes comprehensive error handling:

- File upload validation
- Question type validation
- Automatic cleanup of uploaded files on errors
- Proper HTTP status codes and error messages
