// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { Request } from 'express';

// // Create uploads directories if they don't exist
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const questionFilesDir = path.join(uploadsDir, 'question-files');
// if (!fs.existsSync(questionFilesDir)) {
//   fs.mkdirSync(questionFilesDir, { recursive: true });
// }

// const questionImagesDir = path.join(uploadsDir, 'question-images');
// if (!fs.existsSync(questionImagesDir)) {
//   fs.mkdirSync(questionImagesDir, { recursive: true });
// }

// // Storage configuration for question files
// const questionFileStorage = multer.diskStorage({
//   destination: (req: Request, file: multer.File, cb) => {
//     // Determine destination based on file type
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, questionImagesDir);
//     } else {
//       cb(null, questionFilesDir);
//     }
//   },
//   filename: (req: Request, file: multer.File, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const extension = path.extname(file.originalname);
//     const prefix = file.mimetype.startsWith('image/') ? 'img-' : 'file-';
//     cb(null, prefix + uniqueSuffix + extension);
//   },
// });

// // File filter for question uploads
// const questionFileFilter = (
//   req: Request,
//   file: multer.File,
//   cb: multer.FileFilterCallback,
// ) => {
//   // Allow images
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   }
//   // Allow common document types
//   else if (
//     file.mimetype === 'application/pdf' ||
//     file.mimetype === 'application/msword' ||
//     file.mimetype ===
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
//     file.mimetype === 'text/plain' ||
//     file.mimetype === 'application/vnd.ms-excel' ||
//     file.mimetype ===
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   ) {
//     cb(null, true);
//   }
//   // Allow compressed files
//   else if (
//     file.mimetype === 'application/zip' ||
//     file.mimetype === 'application/x-rar-compressed' ||
//     file.mimetype === 'application/x-7z-compressed'
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         'Unsupported file type. Allowed types: Images, PDF, Word, Excel, Text, ZIP, RAR, 7Z',
//       ),
//     );
//   }
// };

// // Multer instances for different upload types
// export const questionImageUpload = multer({
//   storage: questionFileStorage,
//   fileFilter: (
//     req: Request,
//     file: multer.File,
//     cb: multer.FileFilterCallback,
//   ) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed for image uploads'));
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit for images
//     files: 5, // Maximum 5 files per upload
//   },
// });

// export const questionFileUpload = multer({
//   storage: questionFileStorage,
//   fileFilter: questionFileFilter,
//   limits: {
//     fileSize: 50 * 1024 * 1024, // 50MB limit for files
//     files: 3, // Maximum 3 files per upload
//   },
// });

// export const questionMixedUpload = multer({
//   storage: questionFileStorage,
//   fileFilter: questionFileFilter,
//   limits: {
//     fileSize: 50 * 1024 * 1024, // 50MB limit
//     files: 5, // Maximum 5 files per upload
//   },
// });

// // Helper function to get file info for database storage
// export const getFileInfo = (file: multer.File) => {
//   // Build a web-accessible path under /uploads instead of absolute filesystem path
//   const isImage = file.mimetype.startsWith('image/');
//   const urlPath = isImage
//     ? `/uploads/question-images/${file.filename}`
//     : `/uploads/question-files/${file.filename}`;

//   return {
//     filename: file.filename,
//     originalName: file.originalname,
//     mimetype: file.mimetype,
//     size: file.size,
//     path: urlPath,
//     uploadedAt: new Date(),
//   };
// };

// // Helper function to delete uploaded files
// export const deleteQuestionFile = (filePath: string) => {
//   try {
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       return true;
//     }
//     return false;
//   } catch (error) {
//     // Error deleting file - could be logged to a proper logging service
//     return false;
//   }
// };

// // Helper function to get allowed file types for written questions
// export const getAllowedFileTypes = () => {
//   return {
//     images: [
//       'image/jpeg',
//       'image/png',
//       'image/gif',
//       'image/webp',
//       'image/svg+xml',
//     ],
//     documents: [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'text/plain',
//     ],
//     spreadsheets: [
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     ],
//     archives: [
//       'application/zip',
//       'application/x-rar-compressed',
//       'application/x-7z-compressed',
//     ],
//   };
// };

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Create uploads directories if they don't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const questionFilesDir = path.join(uploadsDir, 'question-files');
if (!fs.existsSync(questionFilesDir))
  fs.mkdirSync(questionFilesDir, { recursive: true });

const questionImagesDir = path.join(uploadsDir, 'question-images');
if (!fs.existsSync(questionImagesDir))
  fs.mkdirSync(questionImagesDir, { recursive: true });

// Storage configuration
const questionFileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    if (file.mimetype.startsWith('image/')) cb(null, questionImagesDir);
    else cb(null, questionFilesDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const prefix = file.mimetype.startsWith('image/') ? 'img-' : 'file-';
    cb(null, prefix + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter
const questionFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedImages = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ];
  const allowedDocuments = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];
  const allowedSpreadsheets = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  const allowedArchives = [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
  ];

  if (
    allowedImages.includes(file.mimetype) ||
    allowedDocuments.includes(file.mimetype) ||
    allowedSpreadsheets.includes(file.mimetype) ||
    allowedArchives.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};

// Multer instances
export const questionImageUpload = multer({
  storage: questionFileStorage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed for image uploads'));
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5,
  },
});

export const questionFileUpload = multer({
  storage: questionFileStorage,
  fileFilter: questionFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 3,
  },
});

export const questionMixedUpload = multer({
  storage: questionFileStorage,
  fileFilter: questionFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 5,
  },
});

// Helper: get file info
export const getFileInfo = (file: Express.Multer.File) => {
  const isImage = file.mimetype.startsWith('image/');
  const urlPath = isImage
    ? `/uploads/question-images/${file.filename}`
    : `/uploads/question-files/${file.filename}`;

  return {
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: urlPath,
    uploadedAt: new Date(),
  };
};

// Helper: delete file
export const deleteQuestionFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Allowed file types
export const getAllowedFileTypes = () => ({
  images: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ],
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  spreadsheets: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  archives: [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
  ],
});
