// AI configuration
import { CACHE_DURATIONS } from './constants';

// AI service configuration
export const AI_CONFIG = {
  // Base configuration
  base: {
    enabled: true,
    version: '1.0.0',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  
  // API endpoints
  endpoints: {
    chat: '/ai/chat',
    analyze: '/ai/analyze',
    transcribe: '/ai/transcribe',
    translate: '/ai/translate',
    recommend: '/ai/recommend',
    detect: '/ai/detect',
    enhance: '/ai/enhance',
    generate: '/ai/generate',
  },
  
  // Model configurations
  models: {
    // Language models
    language: {
      chat: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2048,
        topP: 0.9,
        frequencyPenalty: 0,
        presencePenalty: 0,
      },
      analysis: {
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        maxTokens: 1024,
        topP: 0.8,
      },
      translation: {
        model: 'gpt-3.5-turbo',
        temperature: 0.2,
        maxTokens: 4096,
      },
    },
    
    // Computer vision models
    vision: {
      objectDetection: {
        model: 'yolov5',
        confidence: 0.5,
        nmsThreshold: 0.4,
        maxDetections: 100,
      },
      faceRecognition: {
        model: 'facenet',
        confidence: 0.8,
        maxFaces: 10,
      },
      sceneDetection: {
        model: 'scenetnet',
        confidence: 0.6,
        maxScenes: 50,
      },
      sentimentAnalysis: {
        model: 'emotion-recognition',
        confidence: 0.7,
      },
    },
    
    // Audio models
    audio: {
      transcription: {
        model: 'whisper',
        language: 'auto',
        temperature: 0,
        maxTokens: 1024,
      },
      enhancement: {
        model: 'audio-enhancement',
        noiseReduction: true,
        volumeNormalization: true,
        echoCancellation: false,
      },
      analysis: {
        model: 'audio-classification',
        sampleRate: 16000,
        windowSize: 1024,
      },
    },
    
    // Recommendation models
    recommendation: {
      collaborative: {
        model: 'collaborative-filtering',
        factors: 50,
        regularization: 0.01,
        iterations: 20,
      },
      contentBased: {
        model: 'content-based',
        features: ['genre', 'duration', 'quality', 'language'],
        weight: 0.7,
      },
      hybrid: {
        models: ['collaborative', 'content-based'],
        weights: { collaborative: 0.6, contentBased: 0.4 },
      },
    },
  },
  
  // Feature configurations
  features: {
    // AI Chat
    chat: {
      enabled: true,
      maxHistoryLength: 50,
      contextWindow: 10,
      streaming: true,
      typingIndicators: true,
      suggestions: true,
      markdown: true,
      codeHighlighting: true,
    },
    
    // Content Analysis
    analysis: {
      video: {
        enabled: true,
        autoAnalyze: false,
        features: {
          sceneDetection: true,
          objectDetection: true,
          faceRecognition: true,
          sentimentAnalysis: true,
          contentClassification: true,
        },
      },
      audio: {
        enabled: true,
        autoAnalyze: false,
        features: {
          transcription: true,
          sentimentAnalysis: true,
          musicClassification: true,
          speechAnalysis: true,
        },
      },
      text: {
        enabled: true,
        features: {
          sentimentAnalysis: true,
          keywordExtraction: true,
          topicModeling: true,
          languageDetection: true,
        },
      },
    },
    
    // Transcription
    transcription: {
      enabled: true,
      autoGenerate: false,
      languages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
      accuracy: 'high', // 'low', 'medium', 'high'
      timestamping: true,
      speakerDiarization: true,
      punctuation: true,
      formatting: true,
    },
    
    // Translation
    translation: {
      enabled: true,
      autoTranslate: false,
      sourceLanguage: 'auto',
      targetLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
      preserveFormatting: true,
      realTime: false,
    },
    
    // Recommendations
    recommendations: {
      enabled: true,
      personalized: true,
      diversity: 0.3, // 0 = no diversity, 1 = maximum diversity
      freshness: 0.2, // Weight for newer content
      popularity: 0.3, // Weight for popular content
      userHistory: 0.2, // Weight for user history
      maxRecommendations: 20,
      updateInterval: 3600000, // 1 hour
    },
    
    // Object Detection
    objectDetection: {
      enabled: true,
      realTime: false,
      confidence: 0.5,
      maxObjects: 50,
      categories: [
        'person', 'car', 'animal', 'food', 'electronics',
        'furniture', 'clothing', 'vehicle', 'building', 'nature'
      ],
      tracking: false,
    },
    
    // Face Recognition
    faceRecognition: {
      enabled: true,
      realTime: false,
      confidence: 0.8,
      maxFaces: 10,
      faceDatabase: true,
      anonymization: false,
      emotionDetection: true,
    },
    
    // Scene Detection
    sceneDetection: {
      enabled: true,
      sensitivity: 0.6,
      minSceneLength: 2, // seconds
      maxScenes: 100,
      autoGenerateChapters: true,
    },
    
    // Sentiment Analysis
    sentimentAnalysis: {
      enabled: true,
      granularity: 'segment', // 'frame', 'segment', 'video'
      emotions: ['happy', 'sad', 'angry', 'fear', 'surprise', 'disgust', 'neutral'],
      confidence: 0.7,
      visualization: true,
    },
    
    // Content Enhancement
    enhancement: {
      video: {
        enabled: true,
        upscaling: true,
        denoising: true,
        stabilization: true,
        colorCorrection: true,
        frameInterpolation: false,
      },
      audio: {
        enabled: true,
        noiseReduction: true,
        volumeNormalization: true,
        bassEnhancement: false,
        vocalEnhancement: false,
      },
    },
    
    // Content Generation
    generation: {
      thumbnails: {
        enabled: true,
        count: 5,
        quality: 'high',
        timestamps: 'auto', // 'auto', 'manual', 'intelligent'
      },
      descriptions: {
        enabled: true,
        length: 'medium', // 'short', 'medium', 'long'
        style: 'neutral', // 'neutral', 'casual', 'formal'
        keywords: true,
      },
      tags: {
        enabled: true,
        maxTags: 10,
        relevance: 0.5,
        categories: true,
      },
      titles: {
        enabled: true,
        count: 5,
        style: 'engaging', // 'neutral', 'engaging', 'clickbait'
        length: 'optimal',
      },
      summaries: {
        enabled: true,
        length: 'medium', // 'short', 'medium', 'long'
        style: 'neutral',
        bulletPoints: true,
      },
    },
    
    // Voice Commands
    voiceCommands: {
      enabled: true,
      wakeWord: 'hey player',
      commands: [
        'play', 'pause', 'stop', 'next', 'previous',
        'volume up', 'volume down', 'mute', 'unmute',
        'fullscreen', 'exit fullscreen', 'picture in picture',
        'subtitles on', 'subtitles off', 'faster', 'slower'
      ],
      language: 'en',
      confidence: 0.8,
      continuous: false,
    },
  },
  
  // Processing configuration
  processing: {
    // Batch processing
    batch: {
      enabled: true,
      maxBatchSize: 10,
      timeout: 300000, // 5 minutes
      parallelProcessing: true,
      progressTracking: true,
    },
    
    // Real-time processing
    realtime: {
      enabled: false,
      latency: 1000, // milliseconds
      bufferSize: 1024,
      frameRate: 30,
    },
    
    // Queue management
    queue: {
      maxItems: 100,
      priorityLevels: ['low', 'normal', 'high', 'urgent'],
      autoRetry: true,
      retryDelay: 5000,
      maxRetries: 3,
    },
    
    // Caching
    cache: {
      enabled: true,
      duration: CACHE_DURATIONS.LONG,
      maxSize: 1000, // items
      strategy: 'lru', // 'lru', 'fifo', 'lfu'
    },
  },
  
  // Security and privacy
  security: {
    // Data privacy
    privacy: {
      anonymizeData: true,
      deleteAfterProcessing: true,
      userConsent: true,
      gdprCompliant: true,
    },
    
    // Content moderation
    moderation: {
      enabled: true,
      autoModerate: true,
      categories: ['violence', 'adult', 'hate', 'spam'],
      sensitivity: 0.7,
      action: 'flag', // 'flag', 'block', 'remove'
    },
    
    // Rate limiting
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60,
      burstSize: 10,
      perUser: true,
    },
  },
  
  // Analytics and monitoring
  analytics: {
    enabled: true,
    trackUsage: true,
    trackPerformance: true,
    trackErrors: true,
    metrics: [
      'requestCount',
      'responseTime',
      'accuracy',
      'userSatisfaction',
      'featureUsage'
    ],
    reporting: {
      interval: 3600000, // 1 hour
      retention: 30, // days
    },
  },
  
  // Integration settings
  integrations: {
    // OpenAI
    openai: {
      enabled: true,
      apiKey: '',
      organization: '',
      models: {
        chat: 'gpt-4',
        completion: 'gpt-3.5-turbo',
        embedding: 'text-embedding-ada-002',
      },
    },
    
    // Google Cloud
    google: {
      enabled: false,
      projectId: '',
      credentials: {},
      services: {
        vision: true,
        speech: true,
        translate: true,
        naturalLanguage: true,
      },
    },
    
    // AWS
    aws: {
      enabled: false,
      region: 'us-east-1',
      accessKeyId: '',
      secretAccessKey: '',
      services: {
        rekognition: true,
        transcribe: true,
        translate: true,
        comprehend: true,
      },
    },
    
    // Azure
    azure: {
      enabled: false,
      subscriptionKey: '',
      region: 'eastus',
      services: {
        computerVision: true,
        speech: true,
        translator: true,
        textAnalytics: true,
      },
    },
  },
  
  // User preferences
  preferences: {
    defaultLanguage: 'en',
    autoFeatures: {
      transcription: false,
      translation: false,
      analysis: false,
      recommendations: true,
    },
    privacy: {
      shareUsageData: false,
      allowPersonalization: true,
      enableTracking: false,
    },
    notifications: {
      processingComplete: true,
      newRecommendations: true,
      aiInsights: false,
    },
  },
};

// AI utilities
export const AI_UTILS = {
  // Format confidence score
  formatConfidence: (confidence) => {
    return Math.round(confidence * 100) + '%';
  },
  
  // Validate AI response
  validateResponse: (response, schema) => {
    // Basic validation logic
    if (!response || typeof response !== 'object') {
      return false;
    }
    
    // Schema validation would go here
    return true;
  },
  
  // Calculate processing time
  calculateProcessingTime: (startTime, endTime) => {
    return endTime - startTime;
  },
  
  // Format processing time
  formatProcessingTime: (milliseconds) => {
    if (milliseconds < 1000) {
      return milliseconds + 'ms';
    }
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return seconds + 's';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  },
  
  // Get model info
  getModelInfo: (modelType, modelName) => {
    const model = AI_CONFIG.models[modelType]?.[modelName];
    return model || null;
  },
  
  // Check if feature is enabled
  isFeatureEnabled: (feature) => {
    return AI_CONFIG.features[feature]?.enabled || false;
  },
  
  // Get feature config
  getFeatureConfig: (feature) => {
    return AI_CONFIG.features[feature] || {};
  },
};

export default {
  AI_CONFIG,
  AI_UTILS,
};
