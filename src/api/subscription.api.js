import api from '@services/api.service';

// Subscription API endpoints
export const subscriptionAPI = {
  // Get subscription plans
  getPlans: () => api.get('/subscription/plans'),
  getPlan: (planId) => api.get(`/subscription/plans/${planId}`),
  
  // User subscription
  getUserSubscription: () => api.get('/subscription/user'),
  subscribe: (planId, paymentMethod) => api.post('/subscription/subscribe', { planId, paymentMethod }),
  unsubscribe: () => api.delete('/subscription/unsubscribe'),
  
  // Subscription upgrade/downgrade
  changePlan: (newPlanId) => api.put('/subscription/change-plan', { planId: newPlanId }),
  
  // Payment methods
  getPaymentMethods: () => api.get('/subscription/payment-methods'),
  addPaymentMethod: (paymentData) => api.post('/subscription/payment-methods', paymentData),
  updatePaymentMethod: (methodId, data) => api.put(`/subscription/payment-methods/${methodId}`, data),
  deletePaymentMethod: (methodId) => api.delete(`/subscription/payment-methods/${methodId}`),
  setDefaultPaymentMethod: (methodId) => api.put(`/subscription/payment-methods/${methodId}/default`),
  
  // Billing
  getBillingHistory: (params = {}) => api.get('/subscription/billing', { params }),
  getUpcomingInvoice: () => api.get('/subscription/upcoming-invoice'),
  downloadInvoice: (invoiceId) => api.get(`/subscription/invoices/${invoiceId}/download`),
  
  // Usage tracking
  getUsageStats: () => api.get('/subscription/usage'),
  getUsageLimits: () => api.get('/subscription/limits'),
  
  // Subscription features
  getAvailableFeatures: () => api.get('/subscription/features'),
  checkFeatureAccess: (feature) => api.get(`/subscription/features/${feature}/check`),
  
  // Coupons and discounts
  validateCoupon: (code) => api.post('/subscription/coupons/validate', { code }),
  applyCoupon: (code) => api.post('/subscription/coupons/apply', { code }),
  removeCoupon: () => api.delete('/subscription/coupons'),
  
  // Trial management
  startTrial: (planId) => api.post('/subscription/trial/start', { planId }),
  cancelTrial: () => api.post('/subscription/trial/cancel'),
  getTrialStatus: () => api.get('/subscription/trial/status'),
  
  // Subscription pause/resume
  pauseSubscription: (reason) => api.post('/subscription/pause', { reason }),
  resumeSubscription: () => api.post('/subscription/resume'),
  
  // Subscription renewal
  toggleAutoRenew: (enabled) => api.put('/subscription/auto-renew', { enabled }),
  getNextRenewalDate: () => api.get('/subscription/next-renewal'),
  
  // Subscription cancellation
  requestCancellation: (reason, feedback) => api.post('/subscription/cancellation/request', { reason, feedback }),
  getCancellationOffer: () => api.get('/subscription/cancellation/offer'),
  acceptCancellationOffer: (offerId) => api.post('/subscription/cancellation/offer/accept', { offerId }),
  confirmCancellation: (token) => api.post('/subscription/cancellation/confirm', { token }),
  
  // Refunds
  requestRefund: (invoiceId, reason) => api.post('/subscription/refunds/request', { invoiceId, reason }),
  getRefundStatus: (refundId) => api.get(`/subscription/refunds/${refundId}`),
  
  // Subscription analytics
  getSubscriptionAnalytics: (period) => api.get(`/subscription/analytics/${period}`),
  
  // Team/Group subscriptions
  getTeamSubscription: () => api.get('/subscription/team'),
  inviteTeamMember: (email, role) => api.post('/subscription/team/invite', { email, role }),
  removeTeamMember: (memberId) => api.delete(`/subscription/team/${memberId}`),
  updateTeamMemberRole: (memberId, role) => api.put(`/subscription/team/${memberId}`, { role }),
  
  // Subscription notifications
  getNotificationSettings: () => api.get('/subscription/notifications'),
  updateNotificationSettings: (settings) => api.put('/subscription/notifications', settings),
  
  // Subscription exports
  exportBillingData: (format = 'csv') => api.get(`/subscription/billing/export?format=${format}`),
  exportUsageData: (format = 'csv') => api.get(`/subscription/usage/export?format=${format}`),
  
  // Subscription health
  getSubscriptionHealth: () => api.get('/subscription/health'),
  
  // Payment verification
  verifyPayment: (paymentId) => api.post(`/subscription/payments/${paymentId}/verify`),
  
  // Subscription migration
  migrateSubscription: (data) => api.post('/subscription/migrate', data),
  
  // Gift subscriptions
  purchaseGiftSubscription: (data) => api.post('/subscription/gift/purchase', data),
  redeemGiftSubscription: (code) => api.post('/subscription/gift/redeem', { code }),
  getGiftSubscriptionStatus: (giftId) => api.get(`/subscription/gift/${giftId}`),
};

export default subscriptionAPI;
