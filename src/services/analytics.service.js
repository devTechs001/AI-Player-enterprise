import apiClient from './api.service';

export const analyticsService = {
  // Track page view
  async trackPageView(page, properties = {}) {
    const eventData = {
      event: 'page_view',
      properties: {
        page,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  },

  // Track custom event
  async trackEvent(event, properties = {}) {
    const eventData = {
      event,
      properties,
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error(`Failed to track event ${event}:`, error);
    }
  },

  // Track video play
  async trackVideoPlay(videoId, properties = {}) {
    const eventData = {
      event: 'video_play',
      properties: {
        videoId,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track video play:', error);
    }
  },

  // Track video progress
  async trackVideoProgress(videoId, currentTime, duration, properties = {}) {
    const eventData = {
      event: 'video_progress',
      properties: {
        videoId,
        currentTime,
        duration,
        progress: (currentTime / duration) * 100,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track video progress:', error);
    }
  },

  // Track video complete
  async trackVideoComplete(videoId, properties = {}) {
    const eventData = {
      event: 'video_complete',
      properties: {
        videoId,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track video complete:', error);
    }
  },

  // Track download
  async trackDownload(videoId, format, quality, properties = {}) {
    const eventData = {
      event: 'download_start',
      properties: {
        videoId,
        format,
        quality,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  },

  // Track AI feature usage
  async trackAIUsage(feature, properties = {}) {
    const eventData = {
      event: 'ai_feature_used',
      properties: {
        feature,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track AI usage:', error);
    }
  },

  // Track user engagement
  async trackEngagement(type, properties = {}) {
    const eventData = {
      event: 'user_engagement',
      properties: {
        type,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track engagement:', error);
    }
  },

  // Get user analytics
  async getUserAnalytics(userId, params = {}) {
    const response = await apiClient.get(`/analytics/users/${userId}`, { params });
    return response.data;
  },

  // Get video analytics
  async getVideoAnalytics(videoId, params = {}) {
    const response = await apiClient.get(`/analytics/videos/${videoId}`, { params });
    return response.data;
  },

  // Get platform analytics
  async getPlatformAnalytics(params = {}) {
    const response = await apiClient.get('/analytics/platform', { params });
    return response.data;
  },

  // Get dashboard analytics
  async getDashboardAnalytics(params = {}) {
    const response = await apiClient.get('/analytics/dashboard', { params });
    return response.data;
  },

  // Track error
  async trackError(error, properties = {}) {
    const eventData = {
      event: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (trackError) {
      console.error('Failed to track error:', trackError);
    }
  },

  // Track performance
  async trackPerformance(metric, value, properties = {}) {
    const eventData = {
      event: 'performance',
      properties: {
        metric,
        value,
        ...properties,
      },
    };
    
    try {
      await apiClient.post('/analytics/track', eventData);
    } catch (error) {
      console.error('Failed to track performance:', error);
    }
  },
};