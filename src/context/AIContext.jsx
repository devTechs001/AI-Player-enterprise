import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { aiService } from '../services/ai.service';

const AIContext = createContext();

const aiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_VIDEO_ANALYSIS':
      return {
        ...state,
        videoAnalysis: action.payload,
      };
    case 'SET_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.payload,
      };
    case 'SET_AUTO_SUBTITLES':
      return {
        ...state,
        autoSubtitles: action.payload,
      };
    case 'SET_SCENE_DETECTION':
      return {
        ...state,
        sceneDetection: action.payload,
      };
    case 'SET_OBJECT_DETECTION':
      return {
        ...state,
        objectDetection: action.payload,
      };
    case 'SET_FACE_RECOGNITION':
      return {
        ...state,
        faceRecognition: action.payload,
      };
    case 'SET_SENTIMENT_ANALYSIS':
      return {
        ...state,
        sentimentAnalysis: action.payload,
      };
    case 'SET_VOICE_COMMANDS_ENABLED':
      return {
        ...state,
        voiceCommandsEnabled: action.payload,
      };
    case 'SET_SMART_SEARCH_RESULTS':
      return {
        ...state,
        smartSearchResults: action.payload,
      };
    case 'SET_AI_ENHANCEMENT':
      return {
        ...state,
        aiEnhancement: action.payload,
      };
    case 'SET_CHAT_HISTORY':
      return {
        ...state,
        chatHistory: action.payload,
      };
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };
    case 'CLEAR_AI_DATA':
      return {
        ...state,
        videoAnalysis: null,
        recommendations: [],
        autoSubtitles: null,
        sceneDetection: null,
        objectDetection: null,
        faceRecognition: null,
        sentimentAnalysis: null,
        smartSearchResults: null,
        aiEnhancement: null,
        chatHistory: [],
      };
    default:
      return state;
  }
};

const AIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(aiReducer, {
    loading: false,
    error: null,
    videoAnalysis: null,
    recommendations: [],
    autoSubtitles: null,
    sceneDetection: null,
    objectDetection: null,
    faceRecognition: null,
    sentimentAnalysis: null,
    voiceCommandsEnabled: false,
    smartSearchResults: null,
    aiEnhancement: null,
    chatHistory: [],
  });

  // Analyze video content
  const analyzeVideo = useCallback(async (videoId, options = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const analysis = await aiService.analyzeVideo(videoId, options);
      dispatch({ type: 'SET_VIDEO_ANALYSIS', payload: analysis });
      return analysis;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Get AI recommendations
  const getRecommendations = useCallback(async (videoId, userId, options = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const recommendations = await aiService.getRecommendations(videoId, userId, options);
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations });
      return recommendations;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Generate auto subtitles
  const generateAutoSubtitles = useCallback(async (videoId, language = 'en') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const subtitles = await aiService.generateSubtitles(videoId, language);
      dispatch({ type: 'SET_AUTO_SUBTITLES', payload: subtitles });
      return subtitles;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Detect scenes in video
  const detectScenes = useCallback(async (videoId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const scenes = await aiService.detectScenes(videoId);
      dispatch({ type: 'SET_SCENE_DETECTION', payload: scenes });
      return scenes;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Detect objects in video
  const detectObjects = useCallback(async (videoId, frameTime) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const objects = await aiService.detectObjects(videoId, frameTime);
      dispatch({ type: 'SET_OBJECT_DETECTION', payload: objects });
      return objects;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Recognize faces in video
  const recognizeFaces = useCallback(async (videoId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const faces = await aiService.recognizeFaces(videoId);
      dispatch({ type: 'SET_FACE_RECOGNITION', payload: faces });
      return faces;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Analyze sentiment in video
  const analyzeSentiment = useCallback(async (videoId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const sentiment = await aiService.analyzeSentiment(videoId);
      dispatch({ type: 'SET_SENTIMENT_ANALYSIS', payload: sentiment });
      return sentiment;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Perform smart search
  const smartSearch = useCallback(async (query, filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const results = await aiService.smartSearch(query, filters);
      dispatch({ type: 'SET_SMART_SEARCH_RESULTS', payload: results });
      return results;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Enhance video with AI
  const enhanceVideo = useCallback(async (videoId, enhancementType, options = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const enhancedVideo = await aiService.enhanceVideo(videoId, enhancementType, options);
      dispatch({ type: 'SET_AI_ENHANCEMENT', payload: enhancedVideo });
      return enhancedVideo;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Process voice command
  const processVoiceCommand = useCallback(async (command) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await aiService.processVoiceCommand(command);
      return result;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Send message to AI chat
  const sendMessageToAI = useCallback(async (message, context = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await aiService.sendMessage(message, context);
      const chatMessage = {
        id: Date.now(),
        sender: 'ai',
        message: response,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: chatMessage });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Clear all AI data
  const clearAI = useCallback(() => {
    dispatch({ type: 'CLEAR_AI_DATA' });
  }, []);

  const value = {
    ...state,
    analyzeVideo,
    getRecommendations,
    generateAutoSubtitles,
    detectScenes,
    detectObjects,
    recognizeFaces,
    analyzeSentiment,
    smartSearch,
    enhanceVideo,
    processVoiceCommand,
    sendMessageToAI,
    clearAI,
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export { AIProvider, useAI };